# INFINITAS SCORE TOOL

This is a score tool for beatmania IIDX INFINITAS.

You can register your score using Reflux, a tool to get INFINITAS information.

## How to use

1. Register as a member<br>
   Enter your email address and password. <br>
   An email will be sent to the email address you entered, click on the link provided. <br>
   <br>
2. Login<br>
   Please login with your registered email address and password. <br>
   <br>
3. Register profile and API Key<br>
   Profile registration screen will appear after your first login. <br>
   Profile registration is not required, but is necessary if you wish to publish your scores. <br>
   <br>
4. Download and configure Reflux<br>
   Download - https://github.com/olji/Reflux/releases<br>
   Open config.ini and edit saveremote, server, apikey. <br>
   For apikey, enter the API key you registered in step 3. <br>

```ini
[Record]
saveremote = true

[RemoteRecord]
serverAddress = "https://infs.iidx.wiki"
apikey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

5. Start INFINITAS and Reflux<br>
   The first time you submit a score, it will take some time. <br>
   After the second time, only the difference from the previous time will be sent. <br>

Translated with DeepL.com (free version)
