import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req:NextRequest){
    const formdata = await req.json();
    console.log('Form data:', formdata);
    const data = JSON.stringify(formdata);
    console.log('Data:', data);
    fs.appendFile('kaaryamSubmissions.txt', data + ',\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
        }
    });

    return NextResponse.json({ message: 'Submission saved successfully' });

}


export async function GET(req: NextRequest) {
    const cid = 'bafkreidxhza4yq32hpkryc32kdnojjdnwyfm5nnwe2jak22x4woh2fwmju'; // Replace with your actual CID

    try {
        const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`);
        if (!response.ok) {
            throw new Error('Failed to fetch file from Lighthouse');
        }

        const rawData = await response.text();
        console.log('Raw Data:', rawData); // Logs raw data for verification

        return NextResponse.json({ data: rawData });
    } catch (error) {
        console.error('Error fetching file data:', error);
        return NextResponse.json({ error: 'Failed to retrieve file data' }, { status: 500 });
    }
}

