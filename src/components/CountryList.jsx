import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    <Message message="Add your first city by clicking on the map!" />;

  const countries = cities.reduce((acc, curCity) => {
    if (!acc.map((city) => city.country).includes(curCity.country))
      return [
        ...acc,
        { country: curCity.country, emoji: curCity.emoji, id: curCity.id },
      ];
    else return acc;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
