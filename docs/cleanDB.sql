CREATE DATABASE gdcubadb
    WITH
    OWNER = "default"
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

GRANT TEMPORARY, CONNECT ON DATABASE gdcubadb TO PUBLIC;

GRANT ALL ON DATABASE gdcubadb TO "default";

GRANT ALL ON DATABASE gdcubadb TO neon_superuser;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( CYCLE INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    username character varying(15) COLLATE pg_catalog."default" NOT NULL,
    accountid integer,
    password character varying(255) COLLATE pg_catalog."default",
    phone character varying(25) COLLATE pg_catalog."default",
    status character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT 'u'::character varying,
    role character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT 'user'::character varying,
    harderdemonid integer,
    bestcreatedlevelid integer,
    greeting character varying(30) COLLATE pg_catalog."default" DEFAULT '¡Hola!'::character varying,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to "default";

CREATE TABLE IF NOT EXISTS public.gdaccounts
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( CYCLE INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    username character varying(15) COLLATE pg_catalog."default" NOT NULL,
    accountid integer NOT NULL,
    userid integer NOT NULL,
    isregistered integer,
    stars integer,
    demons integer,
    secretcoins integer,
    usercoins integer,
    globalrank integer,
    diamonds integer,
    creatorpoints integer,
    modlevel integer,
    playercolor integer,
    playercolor2 integer,
    accicon integer,
    accship integer,
    accball integer,
    accbird integer,
    accwave integer,
    accrobot integer,
    accglow integer,
    accspider integer,
    accexplosion integer,
    friendsrqstate integer,
    messagestate integer,
    friendstate integer,
    commenthistorystate integer,
    youtube character varying(30) COLLATE pg_catalog."default",
    twitter character varying(30) COLLATE pg_catalog."default",
    twitch character varying(30) COLLATE pg_catalog."default",
    "timestamp" bigint,
    cuba integer DEFAULT 0,
    moons integer,
    playercolor3 integer,
    accswing integer,
    accjetpack integer,
    CONSTRAINT gdaccounts_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.gdaccounts
    OWNER to "default";

