DROP FUNCTION IF EXISTS GetAllSweets();

create or replace function GetAllSweets () returns table (
  sweet_id uuid,
  uid uuid,
  "timestamp" timestamp with time zone,
  type varchar,
  text text,
  media_urls text,
  handle varchar,
  name text,
  profile_url text,
  bio text,
  "commentsCount" bigint,
  "likesCount" bigint,
  "resweetsCount" bigint
) as $$
BEGIN
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
        (SELECT COUNT(*) FROM comment c WHERE c.sweet_id = s.sweet_id) AS "commentsCount",
        (SELECT COUNT(*) FROM sweetlike l WHERE l.sweet_id = s.sweet_id) AS "likesCount",
        (SELECT COUNT(*) FROM resweet rs WHERE rs.sweet_id = s.sweet_id) AS "resweetsCount"
    FROM
        Sweet s
    JOIN UserProfile up ON s.uid = up.uid;
END;
$$ language plpgsql;