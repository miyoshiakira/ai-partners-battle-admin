import React from "react";
import {
  Container,
  Typography,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// プライバシーポリシーのデータ構造（実際の表示内容をここに定義）
const privacyPolicyContent = {
  title: "A.I.メイト プライバシーポリシー",
  date: "2025年11月24日",
  introduction:
    "本プライバシーポリシーは、Akira Miyoshi（事業者名、以下「当社」といいます）が提供するスマートフォン用アプリケーション「A.I.メイト」（以下「本サービス」といいます）における、ユーザーの個人情報および利用者情報（以下「利用者情報」といいます）の取扱いについて定めるものです。",
  sections: [
    {
      title: "1. 取得する利用者情報および取得方法",
      data: [
        {
          subtitle: "(1) ユーザーが提供する情報",
          description:
            "本サービスのご利用にあたり、ユーザーご自身にご入力いただく情報です。",
          items: [
            "アカウント情報: ユーザー名、パスワード、メールアドレス（連携サービス利用時、またはお問い合わせ時）",
            "お問い合わせ情報: 氏名、メールアドレス、お問い合わせ内容など",
            "課金情報: 決済時に利用する決済手段に関する情報（購入履歴や決済IDなど）",
            "未成年者の情報: 未成年者による課金が行われる場合、保護者の同意の確認に合理的に必要な情報",
          ],
        },
        {
          subtitle: "(2) ユーザーの利用により自動的に取得する情報",
          description:
            "本サービスをご利用いただく際に、自動的に取得する情報です。",
          items: [
            "端末情報: 端末識別子（IDFA/GAIDなど）、OS情報、端末モデル、言語設定、IPアドレス",
            "ログ情報: サービス利用日時、利用機能、操作履歴、クラッシュログ",
            "通信情報: 通信状態、サービス利用時の通信環境",
            "行動履歴情報: 課金状況、キャンペーン利用履歴、対戦結果、育成データなど",
          ],
        },
        {
          subtitle: "(3) ゲーム要素に関連する情報（非個人情報を含む）",
          description: null,
          items: [
            "AI対話・育成データ: AIキャラクターとの対話ログ、育成履歴、ステータスデータ",
            "キャラクター生成データ（プロンプト、アップロード画像データ）",
            "オンライン対戦用キャラクターデータ: ユーザーが対戦用に登録したキャラクターの装備、ステータス、スキル情報",
          ],
        },
      ],
    },
    {
      title: "2. 利用目的",
      description: "当社は、利用者情報を以下の目的で利用します。",
      table: {
        headers: ["利用目的", "取得する情報との関連性"],
        rows: [
          ["本サービスの提供・維持・改善", "全て"],
          [
            "ユーザー認証、アカウント管理、サービスの円滑な運営",
            "アカウント情報、端末情報",
          ],
          [
            "ゲームコンテンツ（AI対話、育成、カードバトル、オンライン対戦）の提供",
            "全て",
          ],
          [
            "ユーザーサポートおよびお問い合わせへの対応",
            "お問い合わせ情報、ログ情報",
          ],
          ["サービス内の不具合、不正行為の調査・対応", "ログ情報、端末情報"],
          ["サービス改善、新機能開発、マーケティング活動のための分析", "全て"],
          [
            "禁止行為への対応とコンテンツ管理（性的な画像、著作権侵害、政治的表現、暴力的な内容の禁止行為に関する検知、監視、対応）",
            "キャラクター生成データ、ログ情報",
          ],
          ["課金サービス提供、購入内容確認、料金請求", "課金情報"],
          [
            "未成年者保護（未成年者による課金時の保護者同意確認、注意喚起）",
            "課金情報、未成年者の情報",
          ],
        ],
      },
    },
    {
      title: "3. 情報の第三者提供",
      description:
        "当社は、原則として、ユーザーの同意を得ずに利用者情報を第三者に提供しません。ただし、以下の場合はこの限りではありません。",
      items: [
        "法令に基づく場合",
        "人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき",
        "利用目的の達成に必要な範囲内において、外部の業務委託先に提供する場合",
        "合併、会社分割、事業譲渡その他の事由により事業の承継が行われる場合",
      ],
    },
    {
      title: "4. 外部送信、情報収集モジュール",
      description:
        "本サービスには、情報収集モジュールが組み込まれています。これにより、利用者情報は当社の指定する外部事業者に送信され、サービスの分析や広告配信に利用されます。（具体的なモジュール名、提供先、利用目的は別途明記が必要です。）",
    },
    {
      title: "5. コンテンツおよび禁止行為に関する特記事項",
      data: [
        {
          subtitle:
            "1. キャラクター生成機能（プロンプト・アップロード画像）について",
          description:
            "ユーザーが本サービスにアップロード、またはプロンプトとして入力した情報について、ユーザーは第三者の権利を侵害しないことを保証するものとします。公序良俗に反する内容や、第三者の権利を侵害する内容、政治に関する内容を含んでいると当社が判断した場合、当社は利用規約に基づき、当該データの削除、利用停止、アカウント停止などの措置を講じることがあります。",
          items: [],
        },
        {
          subtitle: "2. オンライン対戦機能について",
          description:
            "オンライン対戦機能で利用されるキャラクターデータは、他のユーザーに公開され、対戦に利用されます。ただし、当該キャラクターデータから個人の氏名や住所などの個人情報が特定されることはありません。",
          items: [],
        },
      ],
    },
    {
      title: "6. 任意提供と提供しなかった場合の影響",
      description:
        "本サービスへの利用者情報の提供はユーザーの任意ですが、ご提供いただけない場合、または不正確な情報をご提供いただいた場合、本サービスの全部または一部をご利用いただけない場合があります。",
      items: [],
    },
    {
      title: "7. 未成年者の利用について",
      description:
        "未成年者のユーザーが本サービスを利用し、課金サービスを利用する場合は、保護者の同意を得ていただくか、保護者の方から同意を得た上でご利用ください。また、未成年者の過度な課金を防止するため、利用規約に年齢に応じた購入上限額を設けております。",
      items: [],
    },
    {
      title: "8. プライバシーポリシーの改定",
      description:
        "当社は、法令の改正、事業内容の変更、その他必要に応じて本プライバシーポリシーを改定することがあります。改定後のプライバシーポリシーは、本サービス内または当社のウェブサイトに掲載したときから効力を生じるものとします。",
      items: [],
    },
  ],
  contact: {
    title: "9. お問い合わせ窓口",
    items: [
      { key: "開発者名", value: "Akira Miyoshi" },
      { key: "窓口名称", value: "A.I.メイト サポート窓口" },
      { key: "メールアドレス", value: "[miyoshi.akira1997@gmail.com]" },
    ],
  },
};

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <LockIcon color="primary" sx={{ fontSize: 40 }} />
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          {privacyPolicyContent.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          （制定日：{privacyPolicyContent.date}）
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="body1" paragraph>
        {privacyPolicyContent.introduction}
      </Typography>

      {privacyPolicyContent.sections.map((section, index) => (
        <Box key={index} sx={{ mt: 5 }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "medium" }}
          >
            {section.title}
          </Typography>
          {section.description && (
            <Typography variant="body1" paragraph>
              {section.description}
            </Typography>
          )}

          {/* Table rendering for Section 2 */}
          {section.table && (
            <TableContainer component={Paper} elevation={1}>
              <Table size="small">
                <TableHead sx={{ bgcolor: "primary.light" }}>
                  <TableRow>
                    {section.table.headers.map((header, i) => (
                      <TableCell key={i} sx={{ fontWeight: "bold" }}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.table.rows.map((row, i) => (
                    <TableRow key={i}>
                      {row.map((cell, j) => (
                        <TableCell key={j} component="th" scope="row">
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Data list rendering (for sections 1, 3, 5) */}
          {section.data &&
            section.data.map((data, dataIndex) => (
              <Box key={dataIndex} sx={{ mt: 2, ml: data.subtitle ? 0 : 2 }}>
                {data.subtitle && (
                  <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                    {data.subtitle}
                  </Typography>
                )}
                {data.description && (
                  <Typography variant="body2" paragraph>
                    {data.description}
                  </Typography>
                )}
                {data.items && (
                  <List dense>
                    {data.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex}>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon
                            fontSize="small"
                            color="action"
                          />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            ))}

          {/* Simple list for general points (e.g., Section 3) */}
          {section.items && (
            <List sx={{ ml: 2 }}>
              {section.items.map((item, itemIndex) => (
                <ListItem key={itemIndex}>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon fontSize="small" color="action" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )}

          {index < privacyPolicyContent.sections.length - 1 && (
            <Divider sx={{ mt: 4 }} />
          )}
        </Box>
      ))}

      {/* お問い合わせ窓口セクション */}
      <Box
        sx={{
          mt: 5,
          p: 3,
          border: "1px solid",
          borderColor: "grey.300",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "medium" }}
        >
          {privacyPolicyContent.contact.title}
        </Typography>
        <List dense>
          {privacyPolicyContent.contact.items.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      sx={{ fontWeight: "bold", mr: 1 }}
                    >
                      {item.key}:
                    </Typography>
                    {item.value}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
