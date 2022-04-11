from tensorflow import keras
import numpy as np

# LOAD DATA KERAS
data = keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = data.load_data()

# GETTING MODEL VIA SEQUENTIAL API
model = keras.Sequential([
    # INPUT LAYERS
    keras.layers.Flatten(input_shape=(28, 28, )),
	# HIDDEN LAYERS
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dropout(0.5),
    # OUTPUT LAYERS
    keras.layers.Dense(10, activation='softmax')
])

# COMPILE MODEL
model.compile(
    optimizer = keras.optimizers.Adam(),
    loss = keras.losses.SparseCategoricalCrossentropy(),
    metrics = ['accuracy']
)

# TRAINING
model.fit(x_train, y_train, verbose=1, epochs=50, batch_size=32)

# PREDICTION
prediction_probability = model.predict(x_test)
prediction = np.array([np.argmax(pred) for pred in prediction_probability])

# SAVING
model.save('trained_model.h5')