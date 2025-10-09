# 日本の市町村ガチャ

これは、日本の市町村をランダムに選ぶためのツールです。

## テックスタック

- package manager: pnpm
- Framework: React
- Language: TypeScript
- Styling: Tailwind CSS
- Build Tool: Vite
- Testing: Playwright
- Linting: ESLint, Prettier
- Deployment: Vercel

## セットアップ

### 構築

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

### test

```bash
pnpm test
```

### lint

```bash
pnpm lint
```

## ファイル構成

- `src/components`: コンポーネント集
- `src/App.tsx`: メインアプリケーションコンポーネント
- `src/main.tsx`: エントリーポイント
- `src/constants`: 定数定義。都道府県と市町村のデータが収録されている
- `tests`: Playwrightのテストコード
