#ref https://huggingface.co/stabilityai/stable-code-3b 
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("/Users/zhangyadong/Project/HuggingFace-Download-Accelerator/hf_hub/models--stabilityai--stable-code-3b", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
  "/Users/zhangyadong/Project/HuggingFace-Download-Accelerator/hf_hub/models--stabilityai--stable-code-3b",
  trust_remote_code=True,
  torch_dtype="auto",
)
model.cpu()
inputs = tokenizer("write a bubble sort in c", return_tensors="pt").to(model.device)
tokens = model.generate(
  **inputs,
  max_new_tokens=1024,
  temperature=0.2,
  do_sample=True,
)
print(tokenizer.decode(tokens[0], skip_special_tokens=True))
