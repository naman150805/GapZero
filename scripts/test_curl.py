import subprocess

cmd = ['curl.exe', '-s', '-L', 'https://unsplash.com/s/photos/indian-student', '-H', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)']
res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8', errors='ignore')
print("Length of response:", len(res.stdout))
print("First 500 chars:", res.stdout[:500])
with open('unsplash_test.html', 'w', encoding='utf-8') as f:
    f.write(res.stdout)
