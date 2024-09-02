import Head from "next/head";
import PrintPage from "../components/printPage";
import styled from "styled-components";
import { ImageStorageProvider } from "../contexts/ImageStorageContext";

const PageHeader = styled.div`
  width: 600px;
  margin: auto;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 42px;
  padding-bottom: 24px;

  h1 {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.36px;
    color: #585858;
    margin-bottom: 8px;
  }

  p {
    color: #797979;
    margin: 0;
  }
`;

export default function Testpage() {
  return (
    <div>
      <Head>
        <title>Test Page | Popsa.com</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader>
        <h1>Trip to the Beach</h1>
        <p>Hardback Photobook last edited on Thursday 13 April 2022 at 16:28</p>
      </PageHeader>
      <ImageStorageProvider>
        <PrintPage />
      </ImageStorageProvider>
    </div>
  );
}
