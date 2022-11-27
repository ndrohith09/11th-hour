# 11th Hour 
![11th hour](https://user-images.githubusercontent.com/73429989/204120651-dd25000d-b54d-4cfd-a523-13f409b9b125.png)

## Problem Statement 
Many excellent films were produced a few decades ago. However, those movies are only in black and white and not in colour. These days' viewers don't like black and white films. Old movie colour restoration will be a tedious job. Additionally, summarising a film for subtitles, blogging, documentation, or any other purpose might be difficult and take up to two or three hours. What if we could sum up an entire film in a matter of seconds? What if we could bring back the colour of old films such that theatre owners across the globe would profit from this?

## Solution 
Color restoration can be achieved with the help of NoGAN. This is a new type of GAN training that have been developed to solve some key problems in the previous DeOldify model . It provides the benefits of GAN training while spending minimal time doing direct GAN training . Summarization can be achieved with the help of transformers. The Transformer is the first transduction model relying entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution .

## Inspiration
Artificial Intelligence the most heard word now-a-days . The booming technology can be used in many domains. We wanted to use GAN one of the deep learning concept to restore colors for the films. To summarize the films we need to work on Natural Language Processing . Hence we chose hugging face transformers to process those textual content.  

## What it does
11th hour is a web application which is used to restore color for films and summarizer films for condense use in theatres.  User uploads the film url in the afield provided such that we process the film and summarizer the content present in the film . Once the content has been output, the user can save the contextual description using his mobile number. User will get the context to his provided mobile number. Next comes the color restoration . Users can upload the film url such that GANS will process the film and produces a colored output of the film.  

**Output of Color restoration** 
![image](https://user-images.githubusercontent.com/73429989/204120065-21944adf-571b-4137-bbfe-6db21aade5c9.png)

![video](https://camo.githubusercontent.com/e70cf6f9b5523c5c638852306692721cb9322b5282d9c308a2c978f06fd0c84e/68747470733a2f2f7468756d62732e6766796361742e636f6d2f48656176794c6f6e65426c6f77666973682d73697a655f726573747269637465642e676966) 

**Transformer Model Architecture** 

![architecture](https://user-images.githubusercontent.com/73429989/204120170-b0136f22-b371-4d42-bb40-6191bfa0ddb8.png)

**Architecture** 
![image](https://user-images.githubusercontent.com/73429989/204120354-c435b289-bfd4-40ac-9733-fc2b763fd86d.png) 

## How we built it
- The summarizer was built with the help of transformers and huggingface.
- `distilbart-cnn-12-6 ` was used for summarizing text from films.   
- The color restoration was created based on DeOldify model. 
- The DeOldify is based on python and is used with help of fastai. 
- Chakra UI and React JS were used to create the user interface.
- We used FastAPI as our backend to integrate our NLP model with the UI.
- Axios library was used in ReactJS to fetch FastAPI.
- Twilio Services was used to send message.
 
## Challenges we ran into
- Applying pre-trained deep learning model required a significant amount of time and computation power.  
- It was difficult to integrate our deep learning model with the user interface.
- Using hugging face transforms was an aesthetic taste.
- Integrating color restoration domain in the application was the toughest part.
- It took us time to understand the NLP and color restoration models.

## Accomplishments that we're proud of
- We were able to create an amazing application that can restore color for old films and can summarise the entire film within seconds
- Possibly developing a web application and incorporating this model was incredible.
- Sending acknowledgements with twilio was an interesting part of our application.

## What we learned
We gained a lot of knowledge about NLP models and their uses. We learned a little bit about MLOps. Probably more information regarding Transformers was learned. For interfacing with the web application, we worked on Api's.

## What's next for 11th Hour
- Should try to reduce the process time for each request.
- Improve the summarization with more options which will be flexible for users.
- Working on to improve the processing speed of the color restoration .
- Make file upload field available for color restoration application.
