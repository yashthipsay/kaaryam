#!/bin/zsh

# variables
model_name="llama3.2:3b"

custom_model_name="crewai-llama3.2"

#get the base model
ollama pull $model_name

#create the model file
ollama create $custom_model_name -f ./Llama3ModelFile.md