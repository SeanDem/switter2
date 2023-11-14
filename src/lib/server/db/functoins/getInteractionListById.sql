DROP FUNCTION IF EXISTS GetInteractionListById(uuid,uuid,uuid);

CREATE OR REPLACE FUNCTION GetInteractionListById(_sweet_id UUID, _comment_id UUID, _resweet_id UUID) 
RETURNS TABLE (
  sweetId UUID,
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
            s.sweet_id,
            s.uid,
            s.timestamp,
            s.type,
            s.text,
            s.media_urls,
            up.handle,
            up.name,
            up.profile_url,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE sweet_id = s.sweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE sweet_id = s.sweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE sweet_id = s.sweet_id) AS resweetsCount
        FROM
            Sweet s
            JOIN UserProfile up ON s.uid = up.uid
        WHERE
            s.sweet_id = _sweet_id
        LIMIT 1;

    ELSIF _comment_id IS NOT NULL THEN
        RETURN QUERY
        SELECT
            s.sweet_id,
            s.uid,
            s.timestamp,
            s.type,
            s.text,
            s.media_urls,
            up.handle,
            up.name,
            up.profile_url,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE parent_comment_id = _comment_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE comment_id = _comment_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE resweet_id IN (SELECT resweet_id FROM Comment WHERE comment_id = _comment_id)) AS resweetsCount
        FROM
            Sweet s
            JOIN UserProfile up ON s.uid = up.uid
            JOIN Comment c ON s.sweet_id = c.sweet_id
        WHERE
            c.comment_id = _comment_id
        LIMIT 1;

    ELSIF _resweet_id IS NOT NULL THEN
        RETURN QUERY
        SELECT
            s.sweet_id,
            s.uid,
            s.timestamp,
            s.type,
            s.text,
            s.media_urls,
            up.handle,
            up.name,
            up.profile_url,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE resweet_id = _resweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE resweet_id = _resweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE parent_resweet_id = _resweet_id OR resweet_id = _resweet_id) AS resweetsCount
        FROM
            Sweet s
            JOIN UserProfile up ON s.uid = up.uid
            JOIN ReSweet rs ON s.sweet_id = rs.sweet_id
        WHERE
            rs.resweet_id = _resweet_id
        LIMIT 1;
    END IF;
END;
$$ LANGUAGE plpgsql;
