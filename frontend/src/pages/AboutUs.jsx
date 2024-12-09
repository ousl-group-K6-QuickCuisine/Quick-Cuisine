const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-10">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="../../../uploads/image-1732824939897.webp"
          alt="Restaurant"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-extrabold text-yellow-500 mb-4">
            Welcome to Quick Cusine
          </h1>
          <p className="text-xl font-medium">
            Where every meal is an unforgettable experience
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* About Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Our Story
          </h2>
          <div className="lg:flex lg:justify-around lg:items-center">
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-700 mb-4">
                Quick Cusine was founded in 2024 with a passion for great food
                and exceptional service. Our journey began in a small kitchen,
                and over the years, we have grown into a beloved local
                restaurant known for its cozy atmosphere and delicious dishes.
              </p>
              <p className="text-lg text-gray-700">
                Our mission is simple: to serve food that not only satisfies
                your hunger but also delights your senses. Every dish is made
                with love, using only the finest ingredients sourced from local
                farms and markets.
              </p>
            </div>
            <div className="lg:w-1/2 mt-6 lg:mt-0">
              <img
                src="../../../uploads/image-1732824939897.webp"
                alt="Restaurant Interior"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-yellow-50 py-12 rounded-lg shadow-md mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            At Quick Cusine, we are committed to serving high-quality,
            locally-sourced food that brings people together. We believe in
            sustainability, community, and making every dining experience an
            unforgettable one. Whether you are here for a casual lunch or a
            celebratory dinner, we strive to provide an experience that will
            leave you coming back for more.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Fresh Ingredients
            </h3>
            <p className="text-gray-600">
              We only use the freshest locally-sourced ingredients in every dish
              we prepare.
            </p>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Authentic Recipes
            </h3>
            <p className="text-gray-600">
              Our chefs are experts in creating authentic, flavorful dishes that
              bring the best of the cuisine to your table.
            </p>
          </div>
          <div className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Exceptional Service
            </h3>
            <p className="text-gray-600">
              From the moment you walk through the door, our friendly staff will
              make you feel at home.
            </p>
          </div>
        </div>

        {/* Values Section */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Our Core Values
          </h2>
          <ul className="list-disc pl-8 text-lg text-gray-700 max-w-3xl mx-auto">
            <li>
              Quality: We never compromise on the quality of our food or
              service.
            </li>
            <li>
              Community: We're passionate about supporting local farmers and
              businesses.
            </li>
            <li>
              Sustainability: We believe in sustainable practices in both our
              kitchen and dining area.
            </li>
            <li>
              Customer Satisfaction: Our guests' satisfaction is our top
              priority.
            </li>
          </ul>
        </div> */}

        {/* Contact Us Section
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Have questions? Want to make a reservation? We'd love to hear from
            you!
          </p>
          <p className="text-lg text-gray-600">
            Email:{' '}
            <a
              href="mailto:info@restaurantname.com"
              className="text-yellow-500"
            >
              info@restaurantname.com
            </a>
          </p>
          <p className="text-lg text-gray-600">Phone: +123 456 789</p>
          <p className="text-lg text-gray-600">
            Address: 123 Foodie Lane, Colombo, Sri Lanka
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default AboutUs
