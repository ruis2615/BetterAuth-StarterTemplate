# Cloudflare D1

1. 既存のDBもしくは新たなDBを作成

```bash
# 新規作成
pnpm wrangler d1 create

# 既存のDBの一覧を取得
pnpm wrangler d1 list
```

2. ターミナル上に表示されたIDを取得し、`wrangler.jsonc`の `database_id`を書き換え
