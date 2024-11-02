"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function KaaryamSubmissionForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    experience: '',
    skills: '',
    education: '',
    certifications: '',
    projects: '',
    achievements: '',
    languages: '',
    tools: '',
    technologies: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/uploadInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result.message); // Handle success message
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    console.log('Form submitted:', formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Kaaryam Submission Form</CardTitle>
        <CardDescription>Please provide your professional information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="experience">Experience</Label>
            <Textarea id="experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="Briefly describe your work experience" />
          </div>
          <div>
            <Label htmlFor="skills">Skills</Label>
            <Input id="skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., Carpentry, Plumbing, Electrical work" />
          </div>
          <div>
            <Label htmlFor="education">Education</Label>
            <Input id="education" name="education" value={formData.education} onChange={handleChange} placeholder="Highest level of education completed" />
          </div>
          <div>
            <Label htmlFor="certifications">Certifications</Label>
            <Input id="certifications" name="certifications" value={formData.certifications} onChange={handleChange} placeholder="Any relevant certifications" />
          </div>
          <div>
            <Label htmlFor="projects">Projects</Label>
            <Textarea id="projects" name="projects" value={formData.projects} onChange={handleChange} placeholder="Notable projects you've worked on" />
          </div>
          <div>
            <Label htmlFor="achievements">Achievements</Label>
            <Textarea id="achievements" name="achievements" value={formData.achievements} onChange={handleChange} placeholder="Any significant achievements in your field" />
          </div>
          <div>
            <Label htmlFor="languages">Languages</Label>
            <Input id="languages" name="languages" value={formData.languages} onChange={handleChange} placeholder="Languages you can communicate in" />
          </div>
          <div>
            <Label htmlFor="tools">Tools</Label>
            <Input id="tools" name="tools" value={formData.tools} onChange={handleChange} placeholder="Tools you're proficient with" />
          </div>
          <div>
            <Label htmlFor="technologies">Technologies</Label>
            <Input id="technologies" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Any relevant technologies you're familiar with" />
          </div>

          {/* Submit Button */}
          <CardFooter>
            <Button type="submit" className="w-full">Submit</Button> {/* Ensure this is inside the form */}
          </CardFooter>

        </form>
      </CardContent>
    </Card>
  );
}