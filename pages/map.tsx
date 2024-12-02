import Layout from "../layouts/Main";
import Footer from "../components/footer";

const LocationPage = () => {

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <header className="section__intro">
            <h4>Find Local Products with Ease</h4>
          </header>

        </div>
<iframe
src="https://maps.google.com/maps?q=store&output=embed"
width="100%"
height={400}
allowFullScreen
className="w-full h-96"
></iframe>
      </section>


      <Footer />
    </Layout>
  );
};

export default LocationPage;
