-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 30 2022 г., 17:50
-- Версия сервера: 8.0.24
-- Версия PHP: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `lr38`
--

-- --------------------------------------------------------

--
-- Структура таблицы `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(82, '2014_10_12_000000_create_users_table', 1),
(83, '2014_10_12_100000_create_password_resets_table', 1),
(84, '2019_08_19_000000_create_failed_jobs_table', 1),
(85, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(86, '2022_02_25_120951_photo', 1),
(87, '2022_02_28_094429_share', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `photos`
--

CREATE TABLE `photos` (
  `id` bigint UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_real_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `photos`
--

INSERT INTO `photos` (`id`, `url`, `img_name`, `img_real_name`, `owner_id`) VALUES
(1, '1646056150/1646056166.png', 'user.png', '1646056166.png', 3),
(4, 'asdasda.png', 'asdsad', 'asdasdas', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `share`
--

CREATE TABLE `share` (
  `id` bigint UNSIGNED NOT NULL,
  `img_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `share`
--

INSERT INTO `share` (`id`, `img_id`, `user_id`) VALUES
(1, 1, 2),
(2, 1, 2),
(3, 1, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `folder_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `firstname`, `surname`, `folder_name`, `phone`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Ilya', 'Gergert', '1646056140', '1', '$2y$10$5pxajFf3EwXpubE8dJ1lR.CTD/TPXLJ3cvx38Q0WwcjmI4icTFbm2', NULL, '2022-02-28 10:49:00', '2022-02-28 10:49:00'),
(2, 'Ilya', 'Gergert', '1646056146', '2', '$2y$10$5jxUWWp0bh9XDxIuAn8OkuuxUracy4H.7Bl3kHUdfVSvDQl1n3Z7e', '9f80239c026fb6f75b28f3f904681ad3', '2022-02-28 10:49:06', '2022-02-28 10:49:51'),
(3, 'Ilya', 'Gergert', '1646056150', '3', '$2y$10$k8ApvsyLx5BSUvMgXEa5QeztaGpHeRvxrFlgbhy9DN9V7IFSzBheS', '0390ae8477e67aa0954bec84d4126374', '2022-02-28 10:49:10', '2022-02-28 10:49:15'),
(4, 'Ilya', 'Gergert', '1648624739', '123', '$2y$10$E62LG0su7DxHXxsOipQ4peCdxr0EU0OvSdnT0msDkxIcwbtxtxKuC', '208bca89bdfaa937b133a92dd9517ca3', '2022-03-30 04:18:59', '2022-03-30 04:19:31'),
(5, 'Morgan', 'Daniels', '1648641626', '+1 (826) 601-7065', '$2y$10$MIG/MTi8aAFoIKIXaJYDB.RnxRTwDP5hur0Ih07E48OxmO9Ole8L.', '075f3eac19b167e63a69fbd9d7df0f6b', '2022-03-30 09:00:26', '2022-03-30 09:10:05'),
(6, 'Miriam', 'Woodward', '1648646624', '+1 (488) 169-8814', '$2y$10$DayHwiWeUppGulo6roQDburAYyT8FCJjdRNQAveCEd6S9jCqaxqFO', NULL, '2022-03-30 10:23:44', '2022-03-30 10:23:44');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Индексы таблицы `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Индексы таблицы `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `photos_url_unique` (`url`),
  ADD UNIQUE KEY `photos_img_real_name_unique` (`img_real_name`),
  ADD KEY `photos_owner_id_foreign` (`owner_id`);

--
-- Индексы таблицы `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`id`),
  ADD KEY `share_user_id_foreign` (`user_id`),
  ADD KEY `share_img_id_foreign` (`img_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT для таблицы `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `photos`
--
ALTER TABLE `photos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `share`
--
ALTER TABLE `share`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `share`
--
ALTER TABLE `share`
  ADD CONSTRAINT `share_img_id_foreign` FOREIGN KEY (`img_id`) REFERENCES `photos` (`id`),
  ADD CONSTRAINT `share_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
