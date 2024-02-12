import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Link, graphql } from "gatsby";
import { Img } from "../components/Img";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const md = `В края на 2023 година Община Царево и град Царево, преживява своя политически преход. След дългогодишното управление на общината от администрацията на Лапчев, властта беше днес прехвърлена в ръцете на Марин Киров. Този променен политически пейзаж буди нови надежди за бъдещето и потенциалното развитие на общината.

#### [Кметът на Царево Марин Киров обяви ангажимент за светло бъдеще и сътрудничество в общината](/czarevo/kmett-na-czarevo-marin-kirov-obyavi-angazhiment-za-svetlo-bdeshhe-i-strudnichestvo-v-obshhinata/)
![title](https://vestimak-v2.netlify.app/.netlify/images?url=https://storage.googleapis.com/vestimak-image-storage/strandzha-park.jpg&q=1)
Администрацията на Лапчев беше запомнена с редица ключови инициативи, сред които усилия за подобряване на инфраструктурата, привличане на туризъм и развитие на местните общности.

С пристъпването на новия кмет Киров, се очертават нови приоритети. Проектите, които ще имат критично значение за бъдещето на Царево, включват продължаване на обновлението на градската инфраструктура, създаването на нови работни места и разработване на стратегия за устойчиво развитие. Особено внимание трябва да се отдели на екологичните проблеми, с акцент върху опазването на морския бряг и разширяването на зелените зони в града.

#### [Кмет Марин Киров и съставът на новия общински съвет се заклеха пред гражданите](/czarevo/kmet-marin-kirov-i-sstavt-na-noviya-obshhinski-svet-se-zakleha-pred-grazhdanite/)

Марин Киров изрази амбицията си да привлече чуждестранни инвеститори, което може да отключи значителни ресурси за реализацията на големите инфраструктурни проекти. Също така е налице предложение за модернизиране на градската среда и развитие на културни и спортни съоръжения, които да допринесат за разнообразяването на социалния живот на общината.

Надеждите на гражданите са насочени към осъществимостта на избирателните обещания и реализацията на видим прогрес. Това включва не само разширяването на туристическия потенциал, но и подобряването на качеството на живот за местните жители.

#### [Марин Киров след победата си на местните избори за кмет на Царево, призовава за единство и солидарност](/czarevo/marin-kirov-sled-pobedata-si-na-mestnite-izbori-za-kmet-na-czarevo-prizovava-za-edinstvo-i-solidarnost/)

Вярно е, че предизвикателствата са много и пътят напред не е изпъстрен само с лекоти. Управлението на Киров ще трябва да се справя с бюрократични пречки, ограничени финансови ресурси и потребността от съгласуваност на местното самоуправление с националните политики. Също така има нужда от постоянен диалог с общността, за да се гарантира, че техните интереси и потребности са отразени в управленските решения.

Какво предстои за Царево под ръководството на кмет Киров е въпрос, на който ще се отговори с времето. Едно е сигурно - очакванията в общината са високи, а възможностите за съществени промени на хоризонта.
# [test](https://google.com)



`;

const IndexPage = ({ serverData, data }) => {
  console.log(data);
  return null;
  return (
    <div>
      <h1>{serverData.title}</h1>
      <Img src={serverData.image} />
      <GatsbyImage
        alt={data.imageAsset.alt}
        image={getImage(data.imageAsset.gatsbyImage)}
      />
      <Markdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[]}
        components={{
          a: ({ children, href }) => {
            return <Link to={href}>{children}</Link>;
          },
          img: ({ src, alt }) => {
            return <Img src={src} alt={alt} />;
          },
        }}
      >
        {serverData.md}
      </Markdown>
    </div>
  );
};

// export const query = graphql`
//   {
//     imageAsset {
//       gatsbyImage(layout: FULL_WIDTH, width: 600)
//     }
//   }
// `;

export async function getServerData() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
  return {
    props: { md: data.pages_by_pk.body, ...data.pages_by_pk },
  };
}

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch("https://apt-gannet-46.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "x-hasura-admin-secret":
        "1aTiWfxI4Jym4Mg3POblQsKqMZRarCzSM6nMJVZ2IO10E6OcRY8Fc64d3o7MXGKF",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

const operationsDoc = `
  query MyQuery {
    pages_by_pk(id: "7a2fd353-ca18-4705-90b7-18d98de26826") {
      body
      created_at
      id
      image
      title
      updated_at
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

export default IndexPage;
