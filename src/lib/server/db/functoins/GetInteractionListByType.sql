DROP FUNCTION IF EXISTS GetInteractionListByType(text);

CREATE OR REPLACE FUNCTION GetInteractionListByType(_type text) 
RETURNS TABLE (
    "actionId" UUID,
    "sweetId" UUID,
    "commentId" UUID,
    "resweetId" UUID,
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
    "resweetsCount" BIGINT
) AS $$
BEGIN
    IF _type = 'sweet' THEN
        RETURN QUERY
        SELECT
            s.sweet_id as actionId,
            s.sweet_id as sweetId,
            NULL::UUID as commentId,
            NULL::UUID as resweetId,
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
            (SELECT COUNT(*) FROM ReSweet WHERE sweet_id = s.sweet_id) AS resweetsCount
        FROM
            Sweet s
            JOIN UserProfile up ON s.uid = up.uid;

    ELSIF _type = 'comment' THEN
        RETURN QUERY
        SELECT
            c.comment_id as actionId,
            NULL::UUID as sweetId,
            c.comment_id commentId,
            NULL::UUID as resweetId,
            c.uid,
            c.timestamp,
            'comment' as type, 
            c.text,
            NULL as mediaUrls, 
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE parent_comment_id = c.comment_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE comment_id = c.comment_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE comment_id = c.comment_id) AS resweetsCount 
        FROM
            Comment c
            JOIN UserProfile up ON c.uid = up.uid;

    ELSIF _type = 'resweet' THEN
        RETURN QUERY
        SELECT
            rs.resweet_id as actionId,
            NULL::UUID as sweetId,
            NULL::UUID as commentId,
            rs.resweet_id as resweetId,
            rs.uid,
            rs.timestamp, 
            'resweet' as type, 
            rs.text,
            rs.media_urls as mediaUrls,
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE resweet_id = rs.resweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE resweet_id = rs.resweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE parent_resweet_id = rs.resweet_id OR resweet_id = rs.resweet_id) AS resweetsCount
        FROM
            ReSweet rs
            JOIN UserProfile up ON rs.uid = up.uid;
    ELSE
        RAISE EXCEPTION 'Invalid type specified. Must be sweet, comment, or resweet.';
    END IF;
END;
$$ LANGUAGE plpgsql;
