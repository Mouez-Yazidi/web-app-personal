import zipfile,xml.etree.ElementTree as E,glob,json,re
z=zipfile.ZipFile(glob.glob('../*.xlsx')[0]); ns={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
root=E.fromstring(z.read('xl/sharedStrings.xml')); ss=[''.join(t.text or '' for t in si.findall('.//m:t',ns)) for si in root]
root=E.fromstring(z.read('xl/worksheets/sheet1.xml')); data=[]
for row in root.findall('.//m:sheetData/m:row',ns)[1:]:
 item=['']*6
 for c in row:
  col=re.match(r'[A-Z]+',c.get('r')).group(); idx=ord(col)-65
  if idx>=6: continue
  v=c.find('m:v',ns); val=v.text if v is not None else ''
  if c.get('t')=='s' and val: val=ss[int(val)]
  if c.get('t')=='inlineStr': val=''.join(t.text or '' for t in c.findall('.//m:t',ns))
  item[idx]=str(val).strip()
 if any(item): data.append(item)
with open('dist/data.js','w',encoding='utf8') as f: f.write('const providers = '+json.dumps(data,ensure_ascii=False)+';')
print(len(data))
