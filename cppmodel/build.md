# purpose
to record how to rund the llamacpp to run the stable code 3b

# on mac 
```
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp 
```

```
make
```
download stable-code-3b.gguf from url [stable code 3b](https://huggingface.co/stabilityai/stable-code-3b/tree/main)
```
./main -m ~/Downloads/stable-code-3b.gguf -n -1 -p "write a bubble sort in c" 
```