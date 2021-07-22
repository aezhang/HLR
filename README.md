# Handwritten Letter Recognizer

This website is a summer project that allowed me to dip my toes in multiple areas of modern software development that interested me, including React, TensorFlow, and AWS. 

## What it does

By going to [this](https://aezhang.github.io/HLR/) website, you can hand write letters on a canvas and see how a modern, commercial computer vision API (Google Cloud Vision) compares to a custom TensorFlow ML model.

### How it works

The canvas drawing is sent to an AWS Lambda instance, where the image is then forwarded to Google Cloud Vision and also a TensorFlow model stored in an S3 instance.

### Future Updates?

Potential future improvements I have planned but are on indefinite hiatus include making the drawing work on mobile browsers, and also speeding up the AWS Lambda code, but for now, this project has met all initial goals.

### Credits

The font used is [Lato](https://fonts.google.com/specimen/Lato) from Google Fonts, and the H in the favicon is [Pacifico](https://fonts.google.com/specimen/Pacifico), also from Google Fonts. The [React documentation](https://reactjs.org/docs/getting-started.html) and the [TensorFlow Youtube channel](https://www.youtube.com/channel/UC0rqucBdTuFTjJiefW5t-IQ) were immensely helpful in getting this website up and running, and I thank the EMNIST team for providing the training data used. And lastly, a big thanks to Stack Overflow for always having the answer I needed.

