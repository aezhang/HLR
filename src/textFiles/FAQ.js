const faqText = `<p><strong>Q:</strong> Why are some of the lowercase letters missing?<br>
<strong>A:</strong> The letters that look the same in lowercase and uppercase are merged into a single result, since it would be impossible to decide otherwise. 
It just gives the neural nets an easier job :) <br><br><strong>Q:</strong> How come I drew something and Google's response didn't change?
<br><strong>A:</strong> No response from Google usually means it didn't recognize anything in the image :(. I also a limited the number of Google requests to 1,800 per month, since more than that and I would have to pay. The TensorFlow model will always respond, though. 
<br><br><strong>Q:</strong> Why is Google's accuracy/confidence lower?<br><strong>A:</strong> Google's Cloud Vision is trained to recognize not just a single letter, but many at a time (if you can fit them), and even punctuation. 
Not only that, it works on other languages, too. Give it a shot with the Cyrillic И or the Chinese 子! So its accuracy can't really be compared to the Tensorflow model, which only recognizes square, grayscale, single letters.</p>`;

export default faqText;