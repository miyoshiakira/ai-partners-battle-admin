import React, { useState, type FormEvent, type ChangeEvent } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";

// C#のCharacterModelクラスに対応するTypeScriptの型定義
interface CharacterModel {
  user_id: string;
  character_id: string;
  name: string;
  age: number;
  personality: string;
  appearance: string;
  setting: string;
  story: string;
  hp: number;
  mp: number;
  vit: number;
  dex: number;
  agi: number;
  inte: number;
  luc: number;
  fri: number;
  image_name: string;
}

const generateUUID = () => {
  // グローバルな crypto オブジェクトから取得
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // フォールバック（通常は不要ですが、互換性のために）
  // 開発環境によっては、crypto.randomUUID() が利用できない場合があります。
  // その場合は、後述の 'uuid' ライブラリの使用を推奨します。
  console.warn(
    "crypto.randomUUID() is not available. Returning a placeholder."
  );
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// 初期値の設定
const initialCharacter: CharacterModel = {
  user_id: "test",
  character_id: generateUUID(),
  name: "",
  age: 0,
  personality: "",
  appearance: "",
  setting: "",
  story: "",
  hp: 100,
  mp: 50,
  vit: 10,
  dex: 10,
  agi: 10,
  inte: 10,
  luc: 10,
  fri: 0,
  image_name: "",
};

// ダミーのAPIエンドポイント
const REGIST_API_URL = "https://register-character-a42evidd3q-uc.a.run.app";

// --- 💡 修正箇所: ヘルパーコンポーネントを外出し ---

type ChangeHandler = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

// 数値入力フィールドを生成するヘルパーコンポーネント (外出し)
interface NumberFieldProps {
  label: string;
  name: keyof CharacterModel;
  min: number;
  max?: number;
  disabled?: boolean;
  character: CharacterModel; // StateをPropsとして受け取る
  handleChange: ChangeHandler; // HandlerをPropsとして受け取る
}

const NumberField = ({
  label,
  name,
  min,
  max,
  disabled,
  character,
  handleChange,
}: NumberFieldProps) => (
  <TextField
    fullWidth
    required
    label={label}
    name={name as string}
    type="number"
    value={character[name] as number}
    onChange={handleChange}
    disabled={disabled}
    inputProps={{ min: min, max: max }}
    margin="normal"
    variant="outlined"
    sx={{ "& .MuiInputBase-input": { textAlign: "right" } }}
  />
);

// テキスト入力フィールドを生成するヘルパーコンポーネント (外出し)
interface StringFieldProps {
  label: string;
  name: keyof CharacterModel;
  multiline?: boolean;
  disabled?: boolean;
  character: CharacterModel; // StateをPropsとして受け取る
  handleChange: ChangeHandler; // HandlerをPropsとして受け取る
}

const StringField = ({
  label,
  name,
  multiline = false,
  disabled = false,
  character,
  handleChange,
}: StringFieldProps) => (
  <TextField
    fullWidth
    required
    label={label}
    name={name as string}
    value={character[name] as string}
    onChange={handleChange}
    multiline={multiline}
    rows={multiline ? 4 : 1}
    margin="normal"
    variant="outlined"
    disabled={disabled}
  />
);
const CharacterForm: React.FC = () => {
  const [character, setCharacter] = useState<CharacterModel>(initialCharacter);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnemy, setIsEnemy] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  // 入力値変更時のハンドラ
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    // 数値型の場合はNumberに変換し、それ以外はそのまま
    const newValue = type === "number" ? Number(value) : value;

    setCharacter((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // フォーム送信時のハンドラ (POST送信をシミュレート)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // ダミーAPIへのPOST送信処理
      const response = await fetch(REGIST_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(character),
      });

      if (response.ok) {
        // 成功時の処理
        const jsonResponse = await response.json();
        console.log("API Response:", jsonResponse);
        setSubmitMessage("✅ キャラクターモデルの登録に成功しました！");
        // フォームをリセットしたい場合は以下の行を有効化
        // setCharacter(initialCharacter);
      } else {
        // 失敗時の処理
        setSubmitMessage(
          `❌ 登録に失敗しました。ステータス: ${response.status}`
        );
      }
    } catch (error) {
      // エラー時の処理
      console.error("Submission Error:", error);
      setSubmitMessage("❌ ネットワークエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="primary"
        >
          💖 美少女カードゲーム キャラクターモデル登録
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          align="center"
          color="text.secondary"
        >
          全項目必須入力です。
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {/* 1. 基本情報 */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            📋 基本情報
          </Typography>
          <Grid container spacing={2}>
            <Grid>
              <StringField
                label="ユーザーID (user_id)"
                name="user_id"
                handleChange={handleChange}
                character={character}
                disabled
              />
            </Grid>
            <Grid>
              <StringField
                label="キャラクターID (character_id)"
                name="character_id"
                handleChange={handleChange}
                character={character}
                disabled
              />
            </Grid>
            <Grid>
              <StringField
                label="名前 (name)"
                name="name"
                handleChange={handleChange}
                character={character}
              />
            </Grid>
            <Grid>
              {/* C#のint型に対応 */}
              <NumberField
                label="年齢 (age)"
                name="age"
                min={0}
                max={100}
                handleChange={handleChange}
                character={character}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* 2. 詳細設定 (すべてstring型だが、複数行のTextAreaとして扱う) */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            📜 詳細設定
          </Typography>
          <StringField
            label="性格 (personality)"
            name="personality"
            handleChange={handleChange}
            character={character}
            multiline
          />
          <StringField
            label="外見 (appearance)"
            name="appearance"
            multiline
            handleChange={handleChange}
            character={character}
          />
          <StringField
            label="設定・背景 (setting)"
            name="setting"
            multiline
            handleChange={handleChange}
            character={character}
          />
          <StringField
            label="物語・ストーリー (story)"
            name="story"
            multiline
            handleChange={handleChange}
            character={character}
          />

          <Divider sx={{ my: 3 }} />

          {/* 3. ステータス (すべてint型) */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            ⚔️ ステータス (初期値推奨: 10以上)
          </Typography>
          <Grid container spacing={2}>
            <Grid>
              <NumberField
                label="HP (hp)"
                name="hp"
                min={0}
                handleChange={handleChange}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="MP (mp)"
                name="mp"
                min={0}
                handleChange={handleChange}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="VIT / 体力 (vit)"
                name="vit"
                min={1}
                handleChange={handleChange}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="DEX / 器用さ (dex)"
                name="dex"
                min={1}
                handleChange={handleChange}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="AGI / 素早さ (agi)"
                name="agi"
                min={1}
                handleChange={handleChange}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="INTE / 知性 (inte)"
                name="inte"
                min={1}
                handleChange={handleChange}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="LUC / 運 (luc)"
                name="luc"
                min={1}
                handleChange={handleChange}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="FRI / 友好度 (fri)"
                name="fri"
                min={0}
                handleChange={handleChange}
                character={character}
                disabled
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* 4. その他 */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            🖼️ その他
          </Typography>
          <Container sx={{ textAlign: "left" }}>
            <FormControlLabel
              control={
                <Switch
                  onChange={(_, checked) => {
                    setIsEnemy(checked);
                  }}
                  defaultChecked
                />
              }
              label="味方 ←→ 敵"
            />
            <span>
              <b>画像名に「{isEnemy ? "enemy" : "fixed"}」を含めてください</b>
            </span>
            <br />
          </Container>
          <StringField
            label="画像ファイル名 (image_name)"
            name="image_name"
            handleChange={handleChange}
            character={character}
          />

          {/* 送信ボタン */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 2, mb: 2 }}
          >
            {isSubmitting ? "送信中..." : "キャラクターモデルを登録 (POST)"}
          </Button>

          {/* 送信メッセージ表示 */}
          {submitMessage && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: submitMessage.startsWith("✅")
                  ? "success.light"
                  : "error.light",
                borderRadius: 1,
              }}
            >
              <Typography
                color={
                  submitMessage.startsWith("✅")
                    ? "success.contrastText"
                    : "error.contrastText"
                }
              >
                {submitMessage}
              </Typography>
            </Box>
          )}

          {/* 送信内容の確認（デバッグ用） */}
          <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid #ccc" }}>
            <Typography variant="caption" color="text.secondary">
              送信データプレビュー:
            </Typography>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "0.75rem",
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {JSON.stringify(character, null, 2)}
            </pre>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CharacterForm;
