# INFINITAS SCORE TOOL

[INFINITAS SCORE TOOL](https://infs.iidx.wiki)

## TODO

- [x] Add: view other's score
- [x] Add: seo meta tags
- [x] Fix: cpu time exceed error
- [x] Add: api key form
- [ ] Add: how to use page
- [ ] Add: mobile width support
- [ ] Update: statistics page
- [ ] Add: rival page

## Setup

```bash
# bun
bun install
bun run dev
# or bun run build
# or bun run preview
```

## How to use (ja)

beatmania IIDX INFINITAS用のスコアツールです。

INFINITASの情報取得ツール Reflux を利用してスコアを登録できます。

1. 会員登録<br>
   メールアドレスとパスワードを入力します。<br>
   入力したメールアドレスにメールが送られるので、記載されているリンクをクリックしてください。<br>
   <br>
2. ログイン<br>
   登録したメールアドレスとパスワードでログインしてください。<br>
   <br>
3. プロフィールとAPIキーの登録<br>
   初回ログイン後はプロフィール登録画面が表示されます。<br>
   プロフィール登録は必須ではありませんが、スコアを公開する場合は必要です。<br>
   <br>
4. Refluxの設定<br>
   config.iniを開き、saveremote, server, apikeyを編集します。<br>
   apikeyには3で登録したAPIキーを入力してください。<br>

```ini
[Record]
saveremote = true

[RemoteRecord]
serverAddress = "https://infs.iidx.wiki"
apikey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

5. INFINITASとRefluxの起動<br>
   INFINITASとRefluxを起動します。<br>
   初回のスコア送信には時間がかかります。<br>
   2回目以降は前回からの差分のみ送信されます。<br>
