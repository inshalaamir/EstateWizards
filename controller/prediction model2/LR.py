import pandas as pd
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import Lasso
from sklearn.linear_model import Ridge
from sklearn.metrics import r2_score 
import seaborn as sns
import pickle

df=pd.read_csv('final2.csv')

dataset=df.values

tx=df

X = dataset[:,0:7]
Y = dataset[:,7]
boston_df = pd.DataFrame(tx)
sns.boxplot(x=boston_df['area'])

#min_max_scaler = preprocessing.MinMaxScaler()
#X_scale = min_max_scaler.fit_transform(X)

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.3)

lm = LinearRegression()
lm.fit(X_train, Y_train)

filename = 'model.sav'
pickle.dump(lm, open(filename, 'wb'))

y_pred = lm.predict(X_test)




print(r2_score(Y_test, y_pred))
for i in range(5):
    print(X_test[i])
print(pd.DataFrame({'Actual': Y_test, 'Predicted': y_pred}))
