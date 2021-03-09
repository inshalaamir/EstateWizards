import pandas as pd
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from  tensorflow.python.keras.models import Sequential
from  tensorflow.python.keras.layers import Dense

df=pd.read_csv('final2.csv')

dataset=df.values

X = dataset[:,0:4]
Y = dataset[:,4]

min_max_scaler = preprocessing.MinMaxScaler()
X_scale = min_max_scaler.fit_transform(X)

X_train, X_val_and_test, Y_train, Y_val_and_test = train_test_split(X_scale, Y, test_size=0.3)

X_val, X_test, Y_val, Y_test = train_test_split(X_val_and_test, Y_val_and_test, test_size=0.5)

model = Sequential([
    Dense(32, activation='relu', input_shape=(4,)),
    Dense(32, activation='relu'),
    Dense(1),
])

model.compile(optimizer='adam',
              loss='mean_squared_error',
              metrics=['accuracy'])

hist = model.fit(X_train, Y_train,
          batch_size=24, epochs=5,
          validation_data=(X_val, Y_val))


model.evaluate(X_test, Y_test)[1]