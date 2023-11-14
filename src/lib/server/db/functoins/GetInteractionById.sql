DROP FUNCTION IF EXISTS GetInteractionById(uuid,uuid,uuid);

CREATE OR REPLACE FUNCTION GetInteractionById(
    _sweet_id UUID,
    _comment_id UUID,
    _resweet_id UUID
) 
RETURNS TABLE (
    actionId UUID,
    uid UUID,
    "timestamp" TIMESTAMP WITH TIME ZONE,
    type VARCHAR,
    text TEXT,
    mediaUrls TEXT,
    handle VARCHAR,
    name TEXT,
    profileUrl TEXT,
    bio TEXT,
    commentsCount BIGINT,
    likesCount BIGINT,
    resweetsCount BIGINT
) AS $$
BEGIN
    IF _sweet_id IS NOT NULL THEN
        RETURN QUERY
        SELECT
            s.sweet_id as actionId,
            s.uid,
            s.timestamp,
            s.type,
            s.text,
            s.media_urls as mediaUrls,
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE sweet_id = _sweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE sweet_id = _sweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE sweet_id = _sweet_id) AS resweetsCount
        FROM
            Sweet s
            JOIN UserProfile up ON s.uid = up.uid
        WHERE
            s.sweet_id = _sweet_id;

    ELSIF _comment_id IS NOT NULL THEN
        RETURN QUERY
        SELECT
            c.comment_id as actionId,
            c.uid,
            c.timestamp,
            'comment' as type, 
            c.text,
            NULL as mediaUrls, 
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE parent_comment_id = _comment_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE comment_id = _comment_id) AS likesCount,
            0 AS resweetsCount 
        FROM
            Comment c
            JOIN UserProfile up ON c.uid = up.uid
        WHERE
            c.comment_id = _comment_id;

    ELSIF _resweet_id IS NOT NULL THEN
        RETURN QUERY
        SELECT
            rs.resweet_id as actionId,
            s.uid,
            rs.timestamp, 
            'resweet' as type, 
            s.text,
            s.media_urls as mediaUrls,
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE resweet_id = _resweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE resweet_id = _resweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE parent_resweet_id = _resweet_id OR resweet_id = _resweet_id) AS resweetsCount
        FROM
            ReSweet rs
            JOIN Sweet s ON rs.sweet_id = s.sweet_id
            JOIN UserProfile up ON s.uid = up.uid
        WHERE
            rs.resweet_id = _resweet_id;
    END IF;
END;
$$ LANGUAGE plpgsql;
