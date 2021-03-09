import pandas as pd
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from  keras.models import Sequential
from  keras.layers import Dense

df=pd.read_csv('final2.csv')

dataset=df.values

X = dataset[:,0:4]
Y = dataset[:,4]

min_max_scaler = preprocessing.MinMaxScaler()
X_scale = min_max_scaler.fit_transform(X)

X_train, X_test, Y_train, Y_test = train_test_split(X_scale, Y, test_size=0.3)



model = Sequential([
    Dense(8, activation='relu', input_shape=(4,)),
    Dense(4, activation='relu'),
    Dense(1, activation='linear'),
])

model.compile(optimizer='adam',
              loss='mean_squared_error',
              metrics=['accuracy'])

hist = model.fit(X_train, Y_train,
          batch_size=24,epochs=30)


y_pred = model.predict(X_test)
for i in range(len(Y_test)):
	print("X=%s, Predicted=%s" % (Y_test[i], y_pred[i]))