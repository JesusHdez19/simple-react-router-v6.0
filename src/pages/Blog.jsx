import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link, useSearchParams } from "react-router-dom";

export { useFetch } from "../hooks/useFetch";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {

  // }, [searchParams]);

  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const handleChange = (e) => {
    let filter = e.target.value;

    filter ? setSearchParams({ filter }) : setSearchParams({});
  };

  if (loading) return <p>Loading data...</p>;

  if (error) return <p>error...</p>;

  return (
    <>
      <h1>Blog</h1>
      <input
        type="text"
        value={searchParams.get("filter") || ""}
        onChange={handleChange}
        className="form-control my-3"
      />
      <ul className="list-group">
        {data
          .filter((item) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = item.title.toLowerCase();
            return name.startsWith(filter.toLocaleLowerCase());
          })
          .map((item) => (
            // <li key={item.id}>
            //   <Link to={`blog/${item.id}`}>{item.title}</Link>
            // </li>

            <Link
              className="list-group-item"
              key={item.id}
              to={`/blog/${item.id}`}
            >
              {item.id} - {item.title}
            </Link>
          ))}
      </ul>
    </>
  );
};

export default Blog;
