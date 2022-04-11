from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from tensorflow import keras
import cv2
import base64
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Data(BaseModel):
    image: str


# MODEL LOADING
model = keras.models.load_model('./trained_model.h5')


@app.post("/image")
async def image_result(data: Data):
    image_data = data.image
    encoded_data = image_data.split(',')[1]

    # DECODING FROM BASE64
    decoded_from_64 = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    image = cv2.imdecode(decoded_from_64, cv2.IMREAD_COLOR)

    # MAKING 1 CHANNEL OUT OF 3
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    cv2.imwrite('280x280.jpg', gray_image)

    # RESIZING (28, 28)
    gray_image = cv2.resize(gray_image, (28, 28), interpolation=cv2.INTER_LINEAR)
    cv2.imwrite('28x28.jpg', gray_image)

    # EXPANDING (1, 28, 28)
    image = np.expand_dims(gray_image, axis=0)

    try:
        result = np.argmax(model.predict(image))
        print(f"Result : {str(result)}")
        return {"result": f"{str(result)}"}
    except Exception as exc:
        return {"error": "error line 53"}
