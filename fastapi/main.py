from fastapi import FastAPI  
from fastapi.middleware.cors import CORSMiddleware 
import uvicorn 
from transformers import pipeline , AutoModelForSeq2SeqLM
from youtube_transcript_api import YouTubeTranscriptApi 
import time
from twilio.rest import Client

app = FastAPI() 

origins = [
    "http://localhost",
    "http://localhost:3000",
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

summarizer = pipeline("summarization") 
summarizer = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")

def video_summarizer(url):
    try :
        video_id = url.split("=")[1]  
        transcript = YouTubeTranscriptApi.get_transcript(video_id) 
        result = "" 
        for i in transcript:
            result += i["text"] + " "
        
        num_iters = int(len(result)/1000) 
        summarized_text = [] 
        for i in range(0 , num_iters+1): 
            print("train " , i)
            start = 0 
            start = i * 1000 
            end = (i+1) * 1000 
            out = summarizer(result[start:end])
            out = out[0] 
            out = out["summary_text"] 
            summarized_text.append(out) 
        final_text = " ".join(summarized_text)
        return final_text
    except :
        return "Only en-(English) videos can be processed" 

@app.get("/")
async def root():
    return {"message": "Hello World Summarize"} 


@app.post("/test")
async def test(url: str ):
    return {"message": "Hello World Summarize" + url} 

@app.post("/generate")
async def generate(txt: str ):  
    color = video_summarizer(txt)
    
    delay = 5 
    time.sleep(delay) 

    return {"text": txt}

account_sid = '***' 
auth_token = "****"

@app.post("/twilio")
async def twilio(url: str , mobile : str):  

    print(url , mobile)
    client = Client(account_sid, auth_token)
    message = client.messages.create(
    body="Movie Description: "+url,
    from_='+19896822464',
    to='+91'+mobile
    )
    print(message.sid)
    return {"message": "Message sent successfully"}


@app.post("/predict")
async def predict( 
    url: str
): 
    print("url" , url)  
    if url.__contains__("youtube"):
        print("youtube")
        # summary = video_summarizer(url) 

        summary = '''
        Rescue teams are working throught the night to save 12 boys and their coach, trapped inside a cave. 
        The monsoon had come early. 
        Conditions in the cave were impossible. We need expert cave divers out here. 
        The Thai Navy SEALs put everything they had into it. But only this group of 
        people who do it as a weekend hobby has those skills. "It's about controlling your emotions and fear.
        Panic is death, in the cave," he says.He came up with an actual logistical plan for the dive. 
        "We came up with an actual logistical plan for the dive. "We were brutally honest. We promised multiple fatalities", he adds. "Once you start you cannot stop.Believe Believe".
        '''
    else:
        pass 

    delay = 5 
    time.sleep(delay) 
    return { 
        "summarized_text": summary
    }



if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)
