DROP FUNCTION IF EXISTS GetInteractionListByTypeAndFollowing(uuid, text, uuid);
DROP FUNCTION IF EXISTS GetInteractionListByTypeAndFollowing(uuid, text);
DROP FUNCTION IF EXISTS GetInteractionListByFollowing(uuid, text);

CREATE OR REPLACE FUNCTION GetInteractionListByFollowing(_uid UUID) 
RETURNS TABLE (
    "actionId" UUID,
    "sweetId" UUID,
    "commentId" UUID,
    "resweetId" UUID,
    "parentCommentId" UUID,
    "parentResweetId" UUID,
    uid UUID,
    "timestamp" TIMESTAMP WITH TIME ZONE,
    type TEXT,
    text TEXT,
    "mediaUrls" TEXT,
    handle VARCHAR(255),
    name TEXT,
    "profileUrl" TEXT,
    bio TEXT,
    "commentsCount" BIGINT,
    "likesCount" BIGINT,
    "resweetsCount" BIGINT,
    "isLiked" BOOLEAN, 
    "isResweeted" BOOLEAN, 
    "isCommented" BOOLEAN 
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        s.sweet_id as actionId,
        s.sweet_id as sweetId,
        NULL::UUID as commentId,
        NULL::UUID as resweetId,
        NULL::UUID as parentCommentId,
        NULL::UUID as parentResweetId,
        s.uid,
        s.timestamp,
        'sweet' as type,
        s.text,
        s.media_urls as mediaUrls,
        up.handle,
        up.name,
        up.profile_url as profileUrl,
        up.bio,
        (SELECT COUNT(*) FROM Comment WHERE sweet_id = s.sweet_id) AS commentsCount,
        (SELECT COUNT(*) FROM SweetLike WHERE sweet_id = s.sweet_id) AS likesCount,
        (SELECT COUNT(*) FROM ReSweet WHERE sweet_id = s.sweet_id) AS resweetsCount,
        (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE sweet_id = s.sweet_id AND SweetLike.uid = _uid)) AS isLiked,
        (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE sweet_id = s.sweet_id AND ReSweet.uid = _uid)) AS isResweeted,
        (SELECT EXISTS(SELECT 1 FROM Comment WHERE sweet_id = s.sweet_id AND Comment.uid = _uid)) AS isCommented
    FROM
        Sweet s
        JOIN UserProfile up ON s.uid = up.uid
        JOIN UserFollowers uf ON s.uid = uf.followee_uid AND uf.follower_uid = _uid

    UNION ALL

    SELECT
        rs.resweet_id as actionId,
        rs.sweet_id as sweetId,
        NULL::UUID as commentId,
        rs.resweet_id as resweetId,
        NULL::UUID as parentCommentId,
        rs.parent_resweet_id as parentResweetId,
        rs.uid,
        rs.timestamp, 
        'resweet' as type, 
        rs.text,
        NULL as mediaUrls,
        up.handle,
        up.name,
        up.profile_url as profileUrl,
        up.bio,
        (SELECT COUNT(*) FROM Comment WHERE resweet_id = rs.resweet_id) AS commentsCount,
        (SELECT COUNT(*) FROM SweetLike WHERE resweet_id = rs.resweet_id) AS likesCount,
        (SELECT COUNT(*) FROM ReSweet WHERE parent_resweet_id = rs.resweet_id OR resweet_id = rs.resweet_id) AS resweetsCount,
        (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE resweet_id = rs.resweet_id AND SweetLike.uid = _uid)) AS isLiked,
        (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE resweet_id = rs.parent_resweet_id AND ReSweet.uid = _uid)) AS isResweeted,
        (SELECT EXISTS(SELECT 1 FROM Comment WHERE resweet_id = rs.resweet_id AND Comment.uid = _uid)) AS isCommented
    FROM
        ReSweet rs
        JOIN UserProfile up ON rs.uid = up.uid
        JOIN UserFollowers uf ON rs.uid = uf.followee_uid AND uf.follower_uid = _uid

    ORDER BY "timestamp" DESC;
END;
$$ LANGUAGE plpgsql;
