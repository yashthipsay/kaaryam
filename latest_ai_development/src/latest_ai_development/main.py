import os
from resume_analyzer import create_resume_analyzer
import requests

url = "http://localhost:3000/api/uploadInfo";

try:
    response = requests.get(url)
    response.raise_for_status()  # Raises an exception for HTTP errors
    data = response.json()
    print(data)
except requests.exceptions.RequestException as e:
    print("Error fetching data from endpoint:", e)
    

# Example inputs based on specified parameters
experience = data.get("experience", "")
skills = data.get("skills", "")
education = data.get("education", "")
certifications = data.get("certifications", "")
projects = data.get("projects", "")
achievements = data.get("achievements", "")
languages = data.get("languages", "")
tools = data.get("tools", "")
technologies = data.get("technologies", "")
soft_skills = data.get("soft_skills", "")
hard_skills = data.get("hard_skills", "")
overall = data.get("overall", "")

# Job description from employer for evaluation
job_description = """
We are in the business of building construction. On the verge of completing two six storey buildings.
We are looking for an experienced electrician who can handle electrical setups in residential and commercial buildings.
"""

# Call the function with all parameters
result = create_resume_analyzer(experience, skills, education,
                                 certifications, projects,
                                 achievements, languages,
                                 tools, technologies,
                                 soft_skills, hard_skills,
                                 overall, job_description)

# Output the result
print("#########################")
print("Result: ", result)