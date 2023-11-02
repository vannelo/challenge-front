import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchKeanuRequest } from "../store/actions/actions";
import { State } from "../store/reducers/reducers";
import Confetti from "react-confetti";

export default function Home() {
  const [fetchingKeanu, setFetchingKeanu] = useState(false);
  const [keanuFetched, setKeanuFetched] = useState(false);
  const dispatch = useDispatch();
  const widthRef = useRef<HTMLInputElement>();
  const heightRef = useRef<HTMLInputElement>();
  const youngKeanuRef = useRef<HTMLInputElement>();
  const grayscaleRef = useRef<HTMLInputElement>();
  const keanuImage = useSelector((state: State) => state.keanuImage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetchingKeanu(true);

    // Get width, height, and other options from the form
    const width = widthRef.current.value;
    const height = heightRef.current.value;
    const youngKeanu = youngKeanuRef.current.checked;
    const grayscale = grayscaleRef.current.checked;

    // width and height are required
    if (!width || !height) {
      alert("Please input the image width and height");
      setFetchingKeanu(false);
      return;
    }
    // width and height must be numbers
    if (isNaN(width as any) || isNaN(height as any)) {
      alert("Width and height must be numbers");
      setFetchingKeanu(false);
      return;
    }
    // width and height must not be greater than 10000
    if ((width as any) > 10000 || (height as any) > 10000) {
      alert("Width and height must not be greater than 10000");
      setFetchingKeanu(false);
      return;
    }

    dispatch(fetchKeanuRequest({ width, height, youngKeanu, grayscale }));
    setFetchingKeanu(false);
    setKeanuFetched(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Place Keanu Challenge</title>
        <meta name="description" content="Place Keanu Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Keanu Reeves Challenge</h1>
        <p className={styles.description}>
          Input the image width, image height, and the options for young Keanu
          and grayscale.
        </p>
        <div className={styles.formContainer}>
          {fetchingKeanu && (
            <div className={styles.loader}>
              <Image
                width={50}
                height={50}
                src="/loading.gif"
                alt="Loading..."
              />
            </div>
          )}
          {keanuFetched && !fetchingKeanu && (
            <button
              type="submit"
              className={styles.button}
              onClick={() => {
                setKeanuFetched(false);
              }}
            >
              Want another Keanu? Click here!
            </button>
          )}
          {!keanuFetched && (
            <form className={styles.form} onSubmit={handleSubmit}>
              <label>
                Photo Width (px):
                <input type="text" name="imageWidth" ref={widthRef} required />
              </label>
              <label>
                Photo Height (px):
                <input
                  type="text"
                  name="imageHeight"
                  ref={heightRef}
                  required
                />
              </label>
              <label>
                Young Keanus only?:
                <input type="checkbox" name="youngKeanu" ref={youngKeanuRef} />
              </label>
              <label>
                Grayscale?:
                <input type="checkbox" name="grayscale" ref={grayscaleRef} />
              </label>
              <button type="submit" className={styles.button}>
                Get a Keanu!
              </button>
            </form>
          )}
        </div>
        {keanuImage && keanuFetched && (
          <div className={styles.imageContainer}>
            <Confetti width={500} height={500} recycle={false} />
            <img src={keanuImage.url} alt="Keanu" />
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a href="https://vannelo.com" target="_blank" rel="noopener noreferrer">
          Powered by Allan Castellanos
        </a>
      </footer>
    </div>
  );
}
