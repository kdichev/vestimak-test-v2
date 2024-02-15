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
      <Container>
        <Grid container spacing={2}>
          <Grid lg={8}>
            <Typography variant="caption" color="primary" fontWeight={"bold"}>
              БАСКЕТБОЛ
            </Typography>
            <Typography variant="h4" fontWeight={"bold"} sx={{}}>
              Полска се прашува зошто ЕУ и помага на Турција, а не на Турција за
              мигрантите
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Typography
                variant="body1"
                color="primary"
                fontWeight={"bold"}
                sx={{ mr: 1 }}
              >
                Вардарски
              </Typography>
              <Typography variant="body1">
                Петок, 04 август 2023, 14:33
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ mt: 2 }}
            >
              <Box>
                <Facebook sx={{ color: "primary.dark" }} />
                <Twitter sx={{ color: "primary.dark", ml: 2 }} />
                <LinkedIn sx={{ color: "primary.dark", ml: 2 }} />
                <Share sx={{ color: "primary.dark", ml: 2 }} />
              </Box>
              <Box display={"flex"}>
                <VisibilityOutlined />
                <Typography sx={{ ml: 1 }}>{views}</Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 2, mt: 2 }}>
              <Image
                src={`https://vestimak-v2.netlify.app/.netlify/images?url=${heroUrl}&q=35`}
                alt="A lovely bath"
                layout="constrained"
                width={800}
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
                  <Typography variant="h1">{children}</Typography>
                ),
                h2: ({ children }) => (
                  <Typography variant="h2">{children}</Typography>
                ),
                h3: ({ children }) => (
                  <Typography variant="h3">{children}</Typography>
                ),
                h4: ({ children }) => (
                  <Typography variant="h4" gutterBottom>
                    {children}
                  </Typography>
                ),
                h5: ({ children }) => (
                  <Typography variant="h5" gutterBottom>
                    {children}
                  </Typography>
                ),
                h6: ({ children }) => (
                  <Typography variant="h6" gutterBottom>
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
                      width={800}
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

Нивото на бучава во животната средина во Куманово на сите мерни места и за сите три основни Индикатори: бучава преку ден, во текот на вечерта и бучава преку ноќ, е над дозволената гранична вредност“, пишува во извештајот. Куманово е рекордер и во однос на екстремната бучава, која е повисока дури за повеќе од 50 отсто од дозволеното. 

„Екстремно високо максимално ниво на бучава е измерено во пролетниот период во Куманово и изнесува 95,80 децибели, што е за 35,80 д/б над граничните вредности.
`}
            </Markdown>
          </Grid>
          <Grid lg={4}>
            {latestNews.map((i) => (
              <Box sx={{ mt: 1 }}>
                <Chip
                  label={i.category}
                  size="small"
                  sx={{ borderRadius: 1 }}
                />
                <Typography
                  variant="h6"
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
