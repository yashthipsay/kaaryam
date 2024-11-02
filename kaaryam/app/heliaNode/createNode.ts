export async function createNode() {
    const {createHelia} = await import ('helia');
    const {unixfs} = await import ('@helia/unixfs');
    const helia = await createHelia();
    const fs = unixfs(helia);
    console.log('Helia node created:', helia);
    return fs;
}

