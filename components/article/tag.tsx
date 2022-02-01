import { Tag as ChakraTag, TagLabel } from "@chakra-ui/react";
import React from "react";
import { LoadingLink } from "~/components/utils/LoadingLink";
import type { Tag as Props } from "~/types/api";
import styles from "./tag.module.css";

export const Tag: React.FC<Props> = ({ id, name, color }) => {
    return (
        <ChakraTag
            colorScheme={color === "" ? "facebook" : color}
            mr={3}
            paddingTop="3px"
            paddingBottom="3px"
            pl="8px"
            pr="8px"
        >
            <LoadingLink href={`/tag/${id}`} className={styles.text}>
                <TagLabel fontSize="1.3rem">{name}</TagLabel>
            </LoadingLink>
        </ChakraTag>
    );
};

export const TagList: React.FC<{ tags: Props[] }> = ({ tags }) => (
    <>
        {tags.map((tag, i) => (
            <Tag key={i} id={tag.id} name={tag.name} color={tag.color} />
        ))}
    </>
);
