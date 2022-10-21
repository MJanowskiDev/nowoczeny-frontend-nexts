import { ProductDetails } from "../components/Product";
import { Main } from "../components/Main";

const DATA = {
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
  arcu velit, semper rhoncus risus sit amet, viverra ornare arcu. Nulla
  vulputate sodales purus. Nulla facilisi. Aliquam erat volutpat. Morbi
  lacinia lobortis augue. Maecenas consectetur nibh eget erat interdum,
  sit amet commodo elit lobortis. Aenean luctus ultrices purus.
  Pellentesque habitant morbi tristique senectus et netus et malesuada
  fames ac turpis egestas. Quisque ac consectetur ante, ut ultricies
  libero. Vestibulum suscipit lorem at ultrices accumsan. Proin viverra
  lectus et erat aliquet consequat. Praesent id massa risus. Sed
  interdum congue neque, pretium maximus quam. Vivamus quis bibendum ex.`,
  longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
  arcu velit, semper rhoncus risus sit amet, viverra ornare arcu. Nulla
  vulputate sodales purus. Nulla facilisi. Aliquam erat volutpat. Morbi
  lacinia lobortis augue. Maecenas consectetur nibh eget erat interdum,
  sit amet commodo elit lobortis. Aenean luctus ultrices purus.
  Pellentesque habitant morbi tristique senectus et netus et malesuada
  fames ac turpis egestas. Quisque ac consectetur ante, ut ultricies
  libero. Vestibulum suscipit lorem at ultrices accumsan. Proin viverra
  lectus et erat aliquet consequat. Praesent id massa risus. Sed
  interdum congue neque, pretium maximus quam. Vivamus quis bibendum ex.`,
  thumbnailUrl: `https://picsum.photos/id/1060/536/354`,
  thumbnailAlt: `random-image`,
  rating: 4.5,
  title: "Test",
  id: 1,
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Main>{/* <ProductDetails data={DATA} /> */}</Main>
    </div>
  );
};

export default Home;
