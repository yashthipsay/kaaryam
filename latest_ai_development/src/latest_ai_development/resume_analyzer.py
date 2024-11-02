# resume_analyzer.py

import os
from crewai import Agent, Task, Crew
from langchain_openai import ChatOpenAI

def create_resume_analyzer(experience, skills, education, certifications,
                            projects, achievements, languages,
                            tools, technologies, soft_skills,
                            hard_skills, overall, job_description):
    # Set environment variables
    os.environ["OPENAI_API_KEY"] = "NA"  # If using OpenAI-like setup

    # Correct the base_url
    llm = ChatOpenAI(model="ollama/llama3.2", base_url='http://localhost:11434/v1')

    # Define the agent with dynamic parameters
    info_agent = Agent(
        role="Resume Analyzer",
        goal="To analyze resume data and provide insights about it.",
        backstory=f"""
        You are an AI agent of a national initiative called Kaaryam. Your task is to analyze resumes for skilled-level jobs.
        The following details have been provided for analysis:
        - Experience: {experience}
        - Skills: {skills}
        - Education: {education}
        - Certifications: {certifications}
        - Projects: {projects}
        - Achievements: {achievements}
        - Languages: {languages}
        - Tools: {tools}
        - Technologies: {technologies}
        - Soft Skills: {soft_skills}
        - Hard Skills: {hard_skills}
        - Overall Assessment: {overall}
        
        Job Description for evaluation: 
        {job_description}
        """,
        llm=llm
    )

    # Define the task
    task1 = Task(
        description="Analyze the resume of a person applying for a job on the Kaaryam platform and provide insights to the employer.",
        expected_output="""
        Divide the resume compatibility into 4 parts. Only one would be assigned to the applying candidate. 
        The 4 parts are: 1. Very Good, 2. Good, 3. Average, 4. Poor. 
        The insights should be based on the following criteria: 
        1. Experience, 2. Skills, 3. Education, 4. Certifications, 5. Projects,
        6. Achievements, 7. Languages, 8. Tools, 9. Technologies,
        10. Soft Skills, 11. Hard Skills, 12. Overall.
        """,
        agent=info_agent
    )
    
    task2 = Task(
        description="Provide a complete overview of the candidate's qualifications and give a score out of 10 for job fit based on insights from Task 1.",
        expected_output="""
        Summarize the candidate's qualifications based on insights from Task 1 and evaluate their fit for the job.
        
        Provide an overall score out of 10 indicating how fit they are for the job based on:
        - Experience
        - Skills
        - Education
        - Certifications
        - Projects
        - Achievements
        - Languages
        - Tools
        - Technologies
        - Soft Skills
        - Hard Skills
        
        Compare these qualifications against the provided Job Description.
        """,
        agent=info_agent
    )


    # Define the crew
    crew = Crew(
        agents=[info_agent],
        tasks=[task1, task2],
        verbose=True
    )

    # Kickoff the task
    result = crew.kickoff()

    return result