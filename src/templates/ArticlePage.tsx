import { GetServerDataProps, Link, graphql } from "gatsby";
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Image } from "@unpic/react";
import { blurhashToCssGradientString } from "@unpic/placeholder";
import { SetPageViews } from "../components";
import {
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkMdx from "remark-mdx";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Facebook,
  LinkedIn,
  Share,
  Twitter,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

export const ArticleTemplate = ({
  shouldRefetch,
  views,
  title,
  heroUrl,
  markdown,
  slug,
  latestNews = [],
}) => {
  const placeholder = blurhashToCssGradientString(
    "LKGS7Kx^Nz$x.A%2xuM{9aj[s.M|"
  );
  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid sm={8}>
            <Typography variant="caption" color="primary" fontWeight={"bold"}>
              БАСКЕТБОЛ
            </Typography>
            <Typography
              sx={{
                typography: { xs: "h5", sm: "h4" },
                fontWeight: "600 !important",
              }}
              component="h1"
            >
              Полска се прашува зошто ЕУ и помага на Турција, а не на Турција за
              мигрантите
            </Typography>
            <Box display={"flex"} alignItems={"center"} sx={{ mt: 2 }}>
              <Typography
                variant="body1"
                color="primary"
                fontWeight={"bold"}
                sx={{ mr: 2 }}
              >
                Вардарски
              </Typography>
              <Typography variant="body1">4 август 2023</Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ mt: 2 }}
            >
              <Box>
                <Facebook sx={{ color: "primary.dark" }} fontSize="small" />
                <Twitter
                  sx={{ color: "primary.dark", ml: 2 }}
                  fontSize="small"
                />
                <LinkedIn
                  sx={{ color: "primary.dark", ml: 2 }}
                  fontSize="small"
                />
                <Share sx={{ color: "primary.dark", ml: 2 }} fontSize="small" />
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <VisibilityOutlined fontSize="small" />
                <Typography sx={{ ml: 1 }}>{views + 868}</Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 2, mt: 2 }}>
              <Image
                src={`https://vestimak-v2.netlify.app/.netlify/images?url=${heroUrl}&q=35`}
                alt="A lovely bath"
                layout="constrained"
                width={1200}
                background={placeholder}
                aspectRatio={40 / 21}
                priority
                style={{ borderRadius: 8 }}
              />
            </Box>
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                blockquote: ({ children }) => (
                  <Typography
                    component={"blockquote"}
                    sx={{
                      p: 2,
                      borderLeft: "4px solid red",
                      bgcolor: (theme) => theme.palette.grey[100],
                      borderRadius: (theme) => theme.shape.borderRadius / 2,
                      "& p": { mb: 0 },
                      fontStyle: "italic",
                      mb: 2,
                    }}
                  >
                    {children}
                  </Typography>
                ),
                h1: ({ children }) => (
                  <Typography sx={{ mb: 2 }} variant="h1">
                    {children}
                  </Typography>
                ),
                h2: ({ children }) => (
                  <Typography sx={{ mb: 2 }} variant="h2">
                    {children}
                  </Typography>
                ),
                h3: ({ children }) => (
                  <Typography sx={{ mb: 2 }} variant="h3">
                    {children}
                  </Typography>
                ),
                h4: ({ children }) => (
                  <Typography sx={{ mb: 2 }} variant="h4">
                    {children}
                  </Typography>
                ),
                h5: ({ children }) => (
                  <Typography sx={{ mb: 2 }} variant="h5">
                    {children}
                  </Typography>
                ),
                h6: ({ children }) => (
                  <Typography sx={{ mb: 2 }} variant="h6">
                    {children}
                  </Typography>
                ),
                p: ({ children }) => (
                  <Typography variant="body" paragraph>
                    {children}
                  </Typography>
                ),
                a: ({ children, href }) => {
                  return <Link to={href}>{children}</Link>;
                },
                img: ({ src }) => (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Image
                      src={`https://vestimak-v2.netlify.app/.netlify/images?url=${src}&q=35`}
                      alt="A lovely bath"
                      layout="constrained"
                      width={1200}
                      background={placeholder}
                      aspectRatio={40 / 21}
                    />
                  </div>
                ),
                table: ({ children }) => (
                  <TableContainer
                    component={Paper}
                    sx={{ mb: 2, overflow: { xs: "scroll", md: "hidden" } }}
                  >
                    <Table>{children}</Table>
                  </TableContainer>
                ),
                thead: ({ children }) => <TableHead>{children}</TableHead>,
                tr: ({ children }) => <TableRow>{children}</TableRow>,
                th: ({ children }) => <TableCell>{children}</TableCell>,
                td: ({ children }) => <TableCell>{children}</TableCell>,
                sup: ({ children }) => (
                  <Typography component={"sup"} variant="caption">
                    {children}
                  </Typography>
                ),
              }}
            >
              {`
Куманово е рекордер по изложеност на граѓаните на бучава, покажува Годишниот извештај за квалитетот на животната средина за 2022 година, кој што го објави Министерството за животна средина и просторно планирање (МЖСПП). 

###### [Мицкоски: Груевски несе прави со задачава](/svet/testova-stranicza-19/)

Податоците од извештајот покажуваат дека во четирите градови во коисе вршеле мерења – Куманово, Скопје, Битола и Кичево има отстапување од дозволените вредности, но сепак најлоша е состојбата во Куманово. „Согласно обработените податоци од комунална бучава може да се заклучи дека од четирите разгледувани градови, Куманово е град со најголемо загадување од бучава. 

![](https://storage.googleapis.com/vestimak-image-storage/9-rus-sir-razbija.jpg)

Нивото на бучава во животната средина во Куманово на сите мерни места и за сите три основни Индикатори: бучава преку ден, во текот на вечерта и бучава преку ноќ, е над дозволената гранична вредност“, пишува во извештајот. Куманово е рекордер и во однос на екстремната бучава, која е повисока дури за повеќе од 50 отсто од дозволеното. 

„Екстремно високо максимално ниво на бучава е измерено во пролетниот период во Куманово и изнесува 95,80 децибели, што е за 35,80 д/б над граничните вредности.
`}
            </Markdown>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ mt: 4 }}
            >
              <Box>
                <Facebook sx={{ color: "primary.dark" }} />
                <Twitter sx={{ color: "primary.dark", ml: 2 }} />
                <LinkedIn sx={{ color: "primary.dark", ml: 2 }} />
                <Share sx={{ color: "primary.dark", ml: 2 }} />
              </Box>
            </Box>
            <Divider sx={{ mt: 1, mb: 4 }} />
            Повеке
          </Grid>
          <Grid sm={4}>
            {latestNews.map((i) => (
              <Box sx={{ mt: 1 }}>
                <Chip
                  label={i.category}
                  size="small"
                  sx={{
                    borderRadius: 1,
                    bgcolor: "primary.dark",
                    color: "primary.contrastText",
                  }}
                />
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  gutterBottom
                  sx={{ mt: 0.25 }}
                >
                  {i.title}
                </Typography>
                <Divider />
              </Box>
            ))}
          </Grid>
        </Grid>
        {shouldRefetch && <div>should refetch</div>}
        <SetPageViews title={slug} />
      </Container>
    </>
  );
};
