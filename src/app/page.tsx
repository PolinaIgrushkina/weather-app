import { AddCityForm } from "@/components/AddCityForm";
import { CityList } from "@/components/CityList/CityList";
import styles from "@/styles/pages/page.module.scss";

export default function HomePage() {
  return (
    <>
      <section className={`${styles.main__section} section`}>
        <h1 className="title--02">Check the weather in your favorite cities</h1>
        <AddCityForm />
        <CityList />
      </section>
    </>
  );
}
