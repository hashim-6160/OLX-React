import Footer from "../Components/Footer";
import "./home.css";
import Header from "../Components/Header";
import Cardd from "../Components/Card";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <section className="cards">
        <Cardd />
      </section>
      <Footer className="footer" />
    </div>
  );
};

export default Home;