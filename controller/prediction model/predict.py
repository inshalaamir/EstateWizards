from sklearn import preprocessing
import pickle
import sys

inputt=[[]]
for v in sys.argv[1:]:
  inputt[0].append(int(v))



x= inputt


model = pickle.load(open('D:/EW/controller/prediction model/model.sav', 'rb'))
y=model.predict(x)

a=int(y)
b=str(a)
c=b[0:len(b)-3]+'000'
c=c.replace('-','')
print(c)

    
