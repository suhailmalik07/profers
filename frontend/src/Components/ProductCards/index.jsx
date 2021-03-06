import React from "react";
import styles from "./productCard.module.css";
import Box from "@material-ui/core/Box";
import ProductCard from "./ProductCard";

export default function ProductCards({ items }) {
  return (
    <Box display="flex" flexDirection="row" className={styles.box}>
      {items.map((item) => (
        <ProductCard item={item} key={item._id} />
      ))}
    </Box>
  );
}
