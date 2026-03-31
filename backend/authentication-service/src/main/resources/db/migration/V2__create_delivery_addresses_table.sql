CREATE TABLE address (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id    UUID         NOT NULL REFERENCES person(id) ON DELETE CASCADE,
    first_name   VARCHAR(255) NOT NULL,
    last_name    VARCHAR(255) NOT NULL,
    phone        VARCHAR(50)  NOT NULL,
    city         VARCHAR(255) NOT NULL,
    region       VARCHAR(255),
    street       VARCHAR(255) NOT NULL,
    house        VARCHAR(50)  NOT NULL,
    apartment    VARCHAR(50),
    floor        VARCHAR(10),
    has_elevator BOOLEAN      NOT NULL DEFAULT FALSE,
    is_default   BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMP    NOT NULL DEFAULT now()
);

-- Race condition protection: тільки один default на користувача
CREATE UNIQUE INDEX unique_default_address_per_user
    ON address (person_id)
    WHERE is_default = true;