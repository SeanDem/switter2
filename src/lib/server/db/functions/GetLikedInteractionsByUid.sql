CREATE OR REPLACE FUNCTION GetAllLikesByUID (
    _uid UUID, 
    _search_uid uuid
) RETURNS TABLE (
    "likeId" uuid,
    "sweetId" uuid,
    "commentId" uuid,
    "resweetId" uuid,
    "likedEntityType" text,
    "likedEntityText" text,
    "likedEntityTimestamp" timestamp with time zone,
    "likedEntityMediaUrls" text,
    "likedEntityHandle" varchar(255),
    "likedEntityName" text,
    "likedEntityProfileUrl" text,
    "likedEntityBio" text,
    "likedEntityCommentsCount" bigint,
    "likedEntityLikesCount" bigint,
    "likedEntityResweetsCount" bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        sl.like_id as likeId,
        s.sweet_id as sweetId,
        c.comment_id as commentId,
        rs.resweet_id as resweetId,
        CASE 
            WHEN s.sweet_id IS NOT NULL THEN 'sweet'
            WHEN c.comment_id IS NOT NULL THEN 'comment'
            WHEN rs.resweet_id IS NOT NULL THEN 'resweet'
        END as likedEntityType, 
        COALESCE(s.text, c.text, rs.text) as likedEntityText,
        COALESCE(s.timestamp, c.timestamp, rs.timestamp) as likedEntityTimestamp,
        s.media_urls as likedEntityMediaUrls,
        up.handle as likedEntityHandle,
        up.name as likedEntityName,
        up.profile_url as likedEntityProfileUrl,
        up.bio as likedEntityBio,
        (SELECT COUNT(*) FROM Comment WHERE sweet_id = COALESCE(s.sweet_id, c.sweet_id, rs.sweet_id)) AS likedEntityCommentsCount,
        (SELECT COUNT(*) FROM SweetLike WHERE sweet_id = COALESCE(s.sweet_id, c.sweet_id, rs.sweet_id)) AS likedEntityLikesCount,
        (SELECT COUNT(*) FROM ReSweet WHERE sweet_id = COALESCE(s.sweet_id, c.sweet_id, rs.sweet_id)) AS likedEntityResweetsCount
    FROM
        SweetLike sl
        LEFT JOIN Sweet s ON sl.sweet_id = s.sweet_id
        LEFT JOIN Comment c ON sl.comment_id = c.comment_id
        LEFT JOIN ReSweet rs ON sl.resweet_id = rs.resweet_id
        JOIN UserProfile up ON COALESCE(s.uid, c.uid, rs.uid) = up.uid
    WHERE
        sl.uid = _search_uid AND 
        COALESCE(s.uid, c.uid, rs.uid) = _uid;
    ORDER BY COALESCE(s.timestamp, c.timestamp, rs.timestamp) DESC;
END;
$$ LANGUAGE plpgsql;
