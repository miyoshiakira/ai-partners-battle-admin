import { Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export const Home = () => {
  return (
    <Stack direction="row" spacing={2} sx={{ padding: 2 }}>
      {/* 2. プライバシーポリシーページへのリンクボタン */}
      <Button
        component={NavLink}
        // 遷移先のパスを指定
        to="/privacy"
        variant="outlined"
        color="secondary"
        size="large"
        // アイコンを左側に配置
        startIcon={<HomeIcon />}
        sx={{
          "&.active": {
            borderColor: "green", // アクティブな時に枠線の色を変更する例
            color: "green",
          },
        }}
      >
        ポリシーを確認
      </Button>
    </Stack>
  );
};
