# フリーランスポートフォリオサイト

フリーランスWeb制作者向けの、実績と成果を重視したポートフォリオサイトです。
GitHub Pagesで公開し、問い合わせ獲得を目的としています。

## 🎯 サイトの特徴

- **高速・軽量**: Astro製で Core Web Vitals 最適化済み
- **SEO対策済み**: メタタグ、OGP、sitemap、robots.txt完備
- **レスポンシブ**: モバイルファーストデザイン
- **問い合わせ導線明確**: 各ページにCTAボタン配置
- **Markdown対応**: コンテンツを簡単に更新可能

## 📁 ページ構成

- **Home (`/`)**: ヒーロー、価値提案、サービス・実績プレビュー
- **Services (`/services`)**: 提供サービス、対応範囲、開発の進め方、使用技術
- **Works (`/works`)**: 実績一覧
- **Case Studies (`/case-studies`)**: 詳細な事例紹介（課題→施策→成果）
- **About (`/about`)**: 概要、スキルセット、開発に対する考え方
- **Pricing (`/pricing`)**: 料金体系、料金例、FAQ
- **Contact (`/contact`)**: お問い合わせフォーム

## 🚀 セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ブラウザで http://localhost:4321 を開く
```

### ビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## ✏️ コンテンツの編集方法

### 1. 基本情報の変更

**`astro.config.mjs`** で以下を変更：
```javascript
export default defineConfig({
  site: 'https://あなたのユーザー名.github.io',
  base: '/リポジトリ名',
  // ...
});
```

**`src/layouts/BaseLayout.astro`** のナビゲーションやフッター内容を編集

### 2. ページ内容の編集

各ページは `src/pages/` ディレクトリにあります：

- `index.astro` - ホームページ
- `services.astro` - サービスページ
- `works.astro` - 実績一覧
- `case-studies.astro` - 事例詳細
- `about.astro` - 概要
- `pricing.astro` - 料金
- `contact.astro` - お問い合わせ

ファイルを直接編集して、テキストや構成を変更できます。

### 3. 実績・事例の追加

#### 方法1: ページに直接追加

`src/pages/works.astro` や `case-studies.astro` の内容を編集して、新しい事例を追加します。

#### 方法2: Markdownファイルで管理（推奨）

`src/content/works/` ディレクトリにMarkdownファイルを作成：

```markdown
---
title: "プロジェクト名"
description: "概要"
tags: ["タグ1", "タグ2"]
---

詳細な内容...
```

### 4. お問い合わせフォームの設定

**Formspreeを使う場合（推奨）**:

1. [Formspree](https://formspree.io/)にアカウント作成
2. 新しいフォームを作成してフォームIDを取得
3. `src/pages/contact.astro` の以下の部分を変更：

```html
<form 
  action="https://formspree.io/f/あなたのフォームID" 
  method="POST"
>
```

**Google Formsを使う場合**:

Google Formsで作成したフォームの埋め込みコードを使用するか、
フォームURLへのリンクに変更します。

### 5. デザインのカスタマイズ

`src/layouts/BaseLayout.astro` の `<style>` セクションで、
CSS変数を変更してカラーテーマをカスタマイズ：

```css
:root {
  --primary-color: #2563eb;  /* メインカラー */
  --text-dark: #1f2937;      /* テキスト色 */
  /* ... */
}
```

## 📊 SEO設定

### メタタグ

各ページの先頭で以下のように設定：

```astro
<BaseLayout 
  title="ページタイトル"
  description="ページの説明（160文字以内推奨）"
  ogImage="/images/og-image.jpg"
>
```

### OGP画像

1200x630pxの画像を `public/images/` に配置し、各ページで指定します。

### サイトマップ

自動生成されます。ビルド時に `dist/sitemap.xml` が作成されます。

## 🔒 セキュリティ

- フォーム送信は外部サービス（Formspree）経由
- 静的サイトのため、サーバーサイドの脆弱性なし
- 個人情報は直接扱わない設計

## 📈 アナリティクス設定（オプション）

Google Analytics 4を使う場合：

1. GA4でプロパティを作成
2. 測定IDを取得
3. `src/layouts/BaseLayout.astro` の `<head>` 内に追加：

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🚢 デプロイ

### GitHub Pagesへの自動デプロイ

1. GitHubリポジトリにプッシュ
2. GitHub Actionsが自動的にビルド・デプロイ
3. `https://あなたのユーザー名.github.io/リポジトリ名/` で公開

### 手動デプロイ

```bash
npm run build
# dist/ ディレクトリの内容を任意のホスティングサービスにアップロード
```

## ✅ 公開前チェックリスト

- [ ] 3秒以内に「何ができるか」が分かるか
- [ ] 実績に具体的な数字があるか
- [ ] 料金目安が明記されているか
- [ ] 問い合わせボタンが各ページにあるか
- [ ] すべてのページがモバイルで正しく表示されるか
- [ ] お問い合わせフォームが機能するか
- [ ] メタタグ（title, description）が全ページに設定されているか
- [ ] OGP画像が設定されているか
- [ ] 画像の alt テキストが設定されているか
- [ ] Core Web Vitals を確認したか（Lighthouse等で）

## 📝 テンプレート・コピペ用テキスト例

### キャッチコピー例

```
- 確実な成果を出す Web制作パートナー
- レガシーも最新技術も、実績で応える
- ビジネス成果にコミットする フリーランスエンジニア
```

### 提供価値3点の例

```
1. 成果重視の開発 - パフォーマンス改善、CV率向上など数字で示せる成果
2. 幅広い対応力 - レガシーから最新技術まで対応可能
3. 明確なコミュニケーション - 技術内容も分かりやすく説明
```

### 実績テンプレート

```markdown
## プロジェクト名

**課題**
- 課題1
- 課題2
- 課題3

**実施した施策**
- 施策1
- 施策2
- 施策3

**成果**
- XX%改善（指標名）
- YY秒短縮（読込時間等）
- ZZ倍増加（問い合わせ数等）

**工数・期間**: XX時間 / Y週間

**使用技術**: React, TypeScript, Next.js
```

## 🛠️ トラブルシューティング

### ビルドエラーが出る

```bash
# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### ページが表示されない

- `astro.config.mjs` の `base` 設定を確認
- GitHub Pagesの設定でソースが正しく設定されているか確認

### フォームが送信できない

- Formspreeの FormID が正しく設定されているか確認
- ブラウザの開発者ツールでエラーを確認

## 📚 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build/)
- [GitHub Pages公式ドキュメント](https://docs.github.com/ja/pages)
- [Formspree公式サイト](https://formspree.io/)
- [Core Web Vitals](https://web.dev/vitals/)

## 📄 ライセンス

このテンプレートは自由に使用・改変できます。

---

**重要**: このサイトはテンプレートです。公開前に必ず内容をカスタマイズしてください。
