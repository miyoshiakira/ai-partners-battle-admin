import React, {
  useState,
  type FormEvent,
  type ChangeEvent,
  useCallback,
  useEffect,
} from "react";
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
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
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

// 初期値の設定
const initialCharacter: CharacterModel = {
  user_id: "test",
  character_id: "",
  name: "",
  age: 17,
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
const THINK_API_URL =
  "https://generate-character-from-image-a42evidd3q-uc.a.run.app";

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
  const [isAIthinking, setIsAIthinking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnemy, setIsEnemy] = useState<boolean | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [aiThinkMessage, setAIThinkMessage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // 複数ファイルがドロップされた場合でも最初の1つだけを処理
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (
        file.type === "image/png" ||
        file.name.endsWith(".png") ||
        file.type === "image/jpg" ||
        file.name.endsWith(".jpg")
      ) {
        setSelectedFile(file);

        //プロンプト抽出
        // FileReaderインスタンスを作成
        const reader = new FileReader();

        // ファイル読み込みが完了したときのイベントハンドラ
        reader.onload = (event: ProgressEvent<FileReader>) => {
          // 数値型の場合はNumberに変換し、それ以外はそのまま
          setCharacter((prev) => ({
            ...prev,
            image_file: file,
          }));
          console.log(event.target);
        };
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // 依存配列に isEnemy を設定することで、変更時に自動実行される
  useEffect(() => {
    if (isEnemy == null) return;
    // DesideImageName のロジックをここに書く
    const modeStr = isEnemy ? "enemy" : "fixed";
    const now = new Date();
    // 1. 年 (YYYY) を取得
    const year = now.getFullYear();

    // 2. 月 (MM) を取得し、+1してゼロ埋め
    // getMonth() は 0-11 を返すため、1を足してからゼロ埋めします
    const month = String(now.getMonth() + 1).padStart(2, "0");

    // 3. 日 (DD) を取得し、ゼロ埋め
    // getDate() は 1-31 を返す
    const day = String(now.getDate()).padStart(2, "0");

    // 4. 時 (HH) を取得し、ゼロ埋め
    // getHours() は 0-24 を返す
    const hours = String(now.getHours()).padStart(2, "0");

    // 5. 分 (mm) を取得し、ゼロ埋め
    // getMinutes() は 0-60 を返す
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // 6. 秒 (ss) を取得し、ゼロ埋め
    // getSeconds() は 0-60 を返す
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // 7. 全てを結合して yyyymmddhhmmss 形式の文字列を作成
    const yyyymmddhhmmss = `${year}${month}${day}${hours}${minutes}${seconds}`;

    let exStr = `png`;
    if (selectedFile?.name.includes("jpg")) exStr = `jpg`;
    if (selectedFile?.name.includes("png")) exStr = `png`;
    const resStr = `${modeStr}_${yyyymmddhhmmss}_01.${exStr}`;
    // 数値型の場合はNumberに変換し、それ以外はそのまま
    setCharacter((prev) => ({
      ...prev,
      image_name: resStr,
      character_id: `${modeStr}_${yyyymmddhhmmss}_01`,
    }));
  }, [isEnemy]); // isEnemy が変わると実行

  // 入力値変更時のハンドラ
  const handleChange = (key: string, value: string) => {
    setCharacter((prev) => ({
      ...prev,
      // 【修正点】動的なキーにはブラケット記法 [key] を使用
      [key]: value,
    }));
  };

  // フォーム送信時のハンドラ (POST送信をシミュレート)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    // --- 1. FormData オブジェクトの作成 ---
    const formData = new FormData();
    // Python側で request.form.get('data') で取得し、JSON.parse()でパースされます
    formData.append("data", JSON.stringify(character));
    // 💡 画像ファイルそのものを 'image' キーで追加
    // Python側で request.files.get('image') で FileStorage オブジェクトとして取得されます
    if (selectedFile) {
      formData.append("image_file", selectedFile);
    }
    try {
      // ダミーAPIへのPOST送信処理
      const response = await fetch(REGIST_API_URL, {
        method: "POST",
        body: formData,
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

  // フォーム送信時のハンドラ (POST送信をシミュレート)
  const aiThinkSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsAIthinking(true);
    setAIThinkMessage(null);
    // --- 1. FormData オブジェクトの作成 ---
    const formData = new FormData();
    // Python側で request.form.get('data') で取得し、JSON.parse()でパースされます
    formData.append("data", JSON.stringify(character));
    // 💡 画像ファイルそのものを 'image' キーで追加
    // Python側で request.files.get('image') で FileStorage オブジェクトとして取得されます
    if (selectedFile) {
      formData.append("image_file", selectedFile);
    }
    try {
      // ダミーAPIへのPOST送信処理
      const response = await fetch(THINK_API_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // 成功時の処理
        const jsonResponse = await response.json();
        console.log("API Response:");
        const resModel = JSON.parse(jsonResponse);
        console.log(resModel);
        const newModel: CharacterModel = {
          user_id: character.user_id,
          character_id: character.character_id,
          image_name: character.image_name,
          ...resModel,
        };
        console.log(newModel);

        //キャラクターに反映
        setCharacter(newModel);

        setAIThinkMessage("AIはキャラクターを考えて、画面に反映した！");
        // フォームをリセットしたい場合は以下の行を有効化
        // setCharacter(initialCharacter);
      } else {
        // 失敗時の処理
        setAIThinkMessage(
          `AIは考えることに失敗しました。ステータス: ${response.status}`
        );
      }
    } catch (error) {
      // エラー時の処理
      console.error("Submission Error:", error);
      setAIThinkMessage("❌ ネットワークエラーが発生しました。");
    } finally {
      setIsAIthinking(false);
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
          美少女カードゲーム キャラクターモデル登録
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          align="center"
          color="text.secondary"
        >
          全項目必須入力です。
        </Typography>

        {/* 必須項目 */}
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          【必須項目】
        </Typography>
        <Container>
          <Grid container spacing={4}>
            <Grid>
              {/* ファイルドロップゾーン */}
              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed",
                  borderColor: isDragActive ? "primary.main" : "grey.400",
                  borderRadius: 2,
                  p: 4,
                  mb: 3,
                  backgroundColor: isDragActive ? "primary.light" : "grey.50",
                  transition: "background-color 0.3s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "primary.dark",
                  },
                }}
              >
                <input {...getInputProps()} />
                <CloudUploadIcon
                  sx={{ fontSize: 60, color: "grey.500", mb: 1 }}
                />
                {isDragActive ? (
                  <Typography variant="h6" color="primary.main">
                    ここにファイルをドロップしてください...
                  </Typography>
                ) : (
                  <Typography variant="h6" color="text.secondary">
                    ファイルをドラッグ＆ドロップするか、クリックして選択
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  （.png or .jpg 形式のみ）
                </Typography>
              </Box>
            </Grid>
            {/* 選択されたファイル表示 */}
            {selectedFile && (
              <Grid>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Grid>
            )}
          </Grid>
        </Container>
        <Container sx={{ textAlign: "left" }}>
          <FormControl>
            <FormLabel id="mode-radio-buttons-group-label">
              このキャラクターは敵ですか？味方ですか？
            </FormLabel>
            <RadioGroup
              aria-labelledby="mode-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => {
                setIsEnemy(e.target.value == "true");
              }}
            >
              <FormControlLabel value="true" control={<Radio />} label="敵" />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="味方"
              />
            </RadioGroup>
          </FormControl>
          <br />
        </Container>
        {character.image_name && (
          <StringField
            label="画像ファイル名 (image_name)"
            name="image_name"
            handleChange={(e) => {
              handleChange("image_name", e.target.value);
            }}
            character={character}
            disabled
          />
        )}
        <Divider sx={{ my: 3 }} />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {/* 1. 基本情報 */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            【基本情報】
          </Typography>
          {character.image_name && (
            <Container sx={{ textAlign: "left" }}>
              {/* AI思考ボタン */}
              <Button
                variant="contained"
                color="secondary"
                size="large"
                disabled={isAIthinking}
                sx={{ mt: 2, mb: 2, width: 150 }}
                onClick={aiThinkSubmit}
              >
                {isAIthinking ? "AIが作成中…" : "AIで作成"}
              </Button>
              <Box>{aiThinkMessage && <span>{aiThinkMessage}</span>}</Box>
            </Container>
          )}
          <Grid container spacing={2}>
            <Grid>
              <StringField
                label="ユーザーID (user_id)"
                name="user_id"
                handleChange={(e) => {
                  handleChange("user_id", e.target.value);
                }}
                character={character}
                disabled
              />
            </Grid>
            <Grid>
              <StringField
                label="キャラクターID (character_id)"
                name="character_id"
                handleChange={(e) => {
                  handleChange("character_id", e.target.value);
                }}
                character={character}
                disabled
              />
            </Grid>
            <Grid>
              <StringField
                label="名前 (name)"
                name="name"
                handleChange={(e) => {
                  handleChange("name", e.target.value);
                }}
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
                handleChange={(e) => {
                  handleChange("age", e.target.value);
                }}
                character={character}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* 2. 詳細設定 (すべてstring型だが、複数行のTextAreaとして扱う) */}
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            【詳細設定】
          </Typography>
          <StringField
            label="性格 (personality)"
            name="personality"
            handleChange={(e) => {
              handleChange("personality", e.target.value);
            }}
            character={character}
            multiline
          />
          <StringField
            label="外見 (appearance)"
            name="appearance"
            multiline
            handleChange={(e) => {
              handleChange("appearance", e.target.value);
            }}
            character={character}
          />
          <StringField
            label="設定・背景 (setting)"
            name="setting"
            multiline
            handleChange={(e) => {
              handleChange("setting", e.target.value);
            }}
            character={character}
          />
          <StringField
            label="物語・ストーリー (story)"
            name="story"
            multiline
            handleChange={(e) => {
              handleChange("story", e.target.value);
            }}
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
                handleChange={(e) => {
                  handleChange("hp", e.target.value);
                }}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="MP (mp)"
                name="mp"
                min={0}
                handleChange={(e) => {
                  handleChange("mp", e.target.value);
                }}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="VIT / 体力 (vit)"
                name="vit"
                min={1}
                handleChange={(e) => {
                  handleChange("vit", e.target.value);
                }}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="DEX / 器用さ (dex)"
                name="dex"
                min={1}
                handleChange={(e) => {
                  handleChange("dex", e.target.value);
                }}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="AGI / 素早さ (agi)"
                name="agi"
                min={1}
                handleChange={(e) => {
                  handleChange("agi", e.target.value);
                }}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="INTE / 知性 (inte)"
                name="inte"
                min={1}
                handleChange={(e) => {
                  handleChange("inte", e.target.value);
                }}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="LUC / 運 (luc)"
                name="luc"
                min={1}
                handleChange={(e) => {
                  handleChange("luc", e.target.value);
                }}
                character={character}
              />
            </Grid>
            <Grid>
              <NumberField
                label="FRI / 友好度 (fri)"
                name="fri"
                min={0}
                handleChange={(e) => {
                  handleChange("fri", e.target.value);
                }}
                character={character}
                disabled
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />
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
