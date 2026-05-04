-- MySQL dump 10.13  Distrib 8.0.45, for macos15 (x86_64)
--
-- Host: localhost    Database: prenotami
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '2babab3a-01a9-11f1-8440-ba8b87078ca9:1-250';

--
-- Table structure for table `aule`
--

DROP TABLE IF EXISTS `aule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aule` (
  `id_aula` int NOT NULL AUTO_INCREMENT,
  `codice` int NOT NULL,
  `capienza` int DEFAULT NULL,
  `descrizione` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_aula`),
  UNIQUE KEY `codice` (`codice`),
  CONSTRAINT `aule_chk_1` CHECK ((`codice` between 1 and 119))
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aule`
--

LOCK TABLES `aule` WRITE;
/*!40000 ALTER TABLE `aule` DISABLE KEYS */;
INSERT INTO `aule` VALUES (6,1,30,'Aula Didattica (Aula 1)'),(7,2,30,'Aula Didattica (Aula 2)'),(8,3,30,'Aula Didattica (Aula 3)'),(9,4,30,'Aula Didattica (Aula 4)'),(10,5,30,'Aula Didattica (Aula 5)'),(11,6,30,'Aula Didattica (Aula 6)'),(12,7,30,'Aula Didattica (Aula 7)'),(13,8,30,'Aula Didattica (Aula 8)'),(14,9,30,'Aula Didattica (Aula 9)'),(15,10,30,'Aula Didattica (Aula 10)'),(16,11,30,'Aula Didattica (Aula 11)'),(17,12,30,'Aula Didattica (Aula 12)'),(18,13,30,'Aula Didattica (Aula 13)'),(19,14,30,'Aula Didattica (Aula 14)'),(20,15,30,'Aula Didattica (Aula 15)'),(21,16,30,'Aula Didattica (Aula 16)'),(22,17,30,'Aula Didattica (Aula 17)'),(23,18,30,'Aula Didattica (Aula 18)'),(24,19,30,'Aula Didattica (Aula 19)'),(25,20,30,'Aula Didattica (Aula 20)'),(26,21,24,'Laboratorio Specialistico (Lab 21)'),(27,22,24,'Laboratorio Specialistico (Lab 22)'),(28,23,24,'Laboratorio Specialistico (Lab 23)'),(29,24,24,'Laboratorio Specialistico (Lab 24)'),(30,25,24,'Laboratorio Specialistico (Lab 25)'),(31,26,24,'Laboratorio Specialistico (Lab 26)'),(32,27,24,'Laboratorio Specialistico (Lab 27)'),(33,28,24,'Laboratorio Specialistico (Lab 28)'),(34,29,24,'Laboratorio Specialistico (Lab 29)'),(35,30,24,'Laboratorio Specialistico (Lab 30)'),(36,31,24,'Laboratorio Specialistico (Lab 31)'),(37,32,24,'Laboratorio Specialistico (Lab 32)'),(38,33,24,'Laboratorio Specialistico (Lab 33)'),(39,34,24,'Laboratorio Specialistico (Lab 34)'),(40,35,24,'Laboratorio Specialistico (Lab 35)'),(41,36,24,'Laboratorio Specialistico (Lab 36)'),(42,37,24,'Laboratorio Specialistico (Lab 37)'),(43,38,24,'Laboratorio Specialistico (Lab 38)'),(44,39,24,'Laboratorio Specialistico (Lab 39)'),(45,40,24,'Laboratorio Specialistico (Lab 40)'),(46,41,24,'Laboratorio Specialistico (Lab 41)'),(47,42,24,'Laboratorio Specialistico (Lab 42)'),(48,43,24,'Laboratorio Specialistico (Lab 43)'),(49,44,24,'Laboratorio Specialistico (Lab 44)'),(50,45,24,'Laboratorio Specialistico (Lab 45)'),(51,46,24,'Laboratorio Specialistico (Lab 46)'),(52,47,24,'Laboratorio Specialistico (Lab 47)'),(53,48,24,'Laboratorio Specialistico (Lab 48)'),(54,49,24,'Laboratorio Specialistico (Lab 49)'),(55,50,24,'Laboratorio Specialistico (Lab 50)'),(56,51,28,'Aula Didattica (Aula 51)'),(57,52,28,'Aula Didattica (Aula 52)'),(58,53,28,'Aula Didattica (Aula 53)'),(59,54,28,'Aula Didattica (Aula 54)'),(60,55,28,'Aula Didattica (Aula 55)'),(61,56,28,'Aula Didattica (Aula 56)'),(62,57,28,'Aula Didattica (Aula 57)'),(63,58,28,'Aula Didattica (Aula 58)'),(64,59,28,'Aula Didattica (Aula 59)'),(65,60,28,'Aula Didattica (Aula 60)'),(66,61,28,'Aula Didattica (Aula 61)'),(67,62,28,'Aula Didattica (Aula 62)'),(68,63,28,'Aula Didattica (Aula 63)'),(69,64,28,'Aula Didattica (Aula 64)'),(70,65,28,'Aula Didattica (Aula 65)'),(71,66,28,'Aula Didattica (Aula 66)'),(72,67,28,'Aula Didattica (Aula 67)'),(73,68,28,'Aula Didattica (Aula 68)'),(74,69,28,'Aula Didattica (Aula 69)'),(75,70,28,'Aula Didattica (Aula 70)'),(76,71,28,'Aula Didattica (Aula 71)'),(77,72,28,'Aula Didattica (Aula 72)'),(78,73,28,'Aula Didattica (Aula 73)'),(79,74,28,'Aula Didattica (Aula 74)'),(80,75,28,'Aula Didattica (Aula 75)'),(81,76,28,'Aula Didattica (Aula 76)'),(82,77,28,'Aula Didattica (Aula 77)'),(83,78,28,'Aula Didattica (Aula 78)'),(84,79,28,'Aula Didattica (Aula 79)'),(85,80,28,'Aula Didattica (Aula 80)'),(86,81,20,'Laboratorio Tecnico (Lab 81)'),(87,82,20,'Laboratorio Tecnico (Lab 82)'),(88,83,20,'Laboratorio Tecnico (Lab 83)'),(89,84,20,'Laboratorio Tecnico (Lab 84)'),(90,85,20,'Laboratorio Tecnico (Lab 85)'),(91,86,20,'Laboratorio Tecnico (Lab 86)'),(92,87,20,'Laboratorio Tecnico (Lab 87)'),(93,88,20,'Laboratorio Tecnico (Lab 88)'),(94,89,20,'Laboratorio Tecnico (Lab 89)'),(95,90,20,'Laboratorio Tecnico (Lab 90)'),(96,91,20,'Laboratorio Tecnico (Lab 91)'),(97,92,20,'Laboratorio Tecnico (Lab 92)'),(98,93,20,'Laboratorio Tecnico (Lab 93)'),(99,94,20,'Laboratorio Tecnico (Lab 94)'),(100,95,20,'Laboratorio Tecnico (Lab 95)'),(101,96,20,'Laboratorio Tecnico (Lab 96)'),(102,97,20,'Laboratorio Tecnico (Lab 97)'),(103,98,20,'Laboratorio Tecnico (Lab 98)'),(104,99,20,'Laboratorio Tecnico (Lab 99)'),(105,100,20,'Laboratorio Tecnico (Lab 100)'),(106,101,15,'Aula Informatica/Multimediale (Settore 101)'),(107,102,15,'Aula Informatica/Multimediale (Settore 102)'),(108,103,15,'Aula Informatica/Multimediale (Settore 103)'),(109,104,15,'Aula Informatica/Multimediale (Settore 104)'),(110,105,15,'Aula Informatica/Multimediale (Settore 105)'),(111,106,15,'Aula Informatica/Multimediale (Settore 106)'),(112,107,15,'Aula Informatica/Multimediale (Settore 107)'),(113,108,15,'Aula Informatica/Multimediale (Settore 108)'),(114,109,15,'Aula Informatica/Multimediale (Settore 109)'),(115,110,15,'Aula Informatica/Multimediale (Settore 110)'),(116,111,10,'Aula Ricevimento / Ufficio Tecnico (Stanza 111)'),(117,112,10,'Aula Ricevimento / Ufficio Tecnico (Stanza 112)'),(118,113,10,'Aula Ricevimento / Ufficio Tecnico (Stanza 113)'),(119,114,10,'Aula Ricevimento / Ufficio Tecnico (Stanza 114)'),(120,115,10,'Aula Ricevimento / Ufficio Tecnico (Stanza 115)'),(121,116,10,'Aula Ricevimento / Ufficio Tecnico (Stanza 116)'),(122,117,10,'Aula Ricevimento / Ufficio Tecnico (Stanza 117)'),(123,118,10,'Aula Ricevimento / Ufficio Tecnico (Stanza 118)'),(124,119,10,'Aula Ricevimento / Ufficio Tecnico (Stanza 119)');
/*!40000 ALTER TABLE `aule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classi`
--

DROP TABLE IF EXISTS `classi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classi` (
  `id_classe` int NOT NULL AUTO_INCREMENT,
  `anno` int NOT NULL,
  `sezione` varchar(2) NOT NULL,
  `indirizzo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_classe`),
  CONSTRAINT `classi_chk_1` CHECK ((`anno` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classi`
--

LOCK TABLES `classi` WRITE;
/*!40000 ALTER TABLE `classi` DISABLE KEYS */;
INSERT INTO `classi` VALUES (1,3,'AI','Informatica'),(2,4,'BI','Telecomunicazioni'),(3,5,'AE','Elettronica ed Automazione'),(4,3,'CM','Chimica e Materiali'),(5,5,'AM','Meccanica, Meccatronica ed Energia'),(6,4,'AL','Trasporti e Logistica'),(7,2,'CA','Costruzioni, Ambiente e Territorio');
/*!40000 ALTER TABLE `classi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partecipazione_classi`
--

DROP TABLE IF EXISTS `partecipazione_classi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partecipazione_classi` (
  `id_prenotazione` int NOT NULL,
  `id_classe` int NOT NULL,
  PRIMARY KEY (`id_prenotazione`,`id_classe`),
  KEY `id_classe` (`id_classe`),
  CONSTRAINT `partecipazione_classi_ibfk_1` FOREIGN KEY (`id_prenotazione`) REFERENCES `prenotazioni` (`id_prenotazione`) ON DELETE CASCADE,
  CONSTRAINT `partecipazione_classi_ibfk_2` FOREIGN KEY (`id_classe`) REFERENCES `classi` (`id_classe`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partecipazione_classi`
--

LOCK TABLES `partecipazione_classi` WRITE;
/*!40000 ALTER TABLE `partecipazione_classi` DISABLE KEYS */;
/*!40000 ALTER TABLE `partecipazione_classi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prenotazioni`
--

DROP TABLE IF EXISTS `prenotazioni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prenotazioni` (
  `id_prenotazione` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `ora_inizio` time NOT NULL,
  `ora_fine` time NOT NULL,
  `id_utente` int NOT NULL,
  `id_aula` int NOT NULL,
  `motivazione` varchar(255) NOT NULL,
  PRIMARY KEY (`id_prenotazione`),
  KEY `id_utente` (`id_utente`),
  KEY `id_aula` (`id_aula`),
  CONSTRAINT `prenotazioni_ibfk_1` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id_utente`) ON DELETE CASCADE,
  CONSTRAINT `prenotazioni_ibfk_2` FOREIGN KEY (`id_aula`) REFERENCES `aule` (`id_aula`) ON DELETE CASCADE,
  CONSTRAINT `check_orario` CHECK ((`ora_inizio` < `ora_fine`))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prenotazioni`
--

LOCK TABLES `prenotazioni` WRITE;
/*!40000 ALTER TABLE `prenotazioni` DISABLE KEYS */;
INSERT INTO `prenotazioni` VALUES (2,'2026-04-20','08:00:00','10:00:00',1,6,'Studio individuale'),(4,'2026-04-15','08:00:00','10:00:00',96,10,'zuppa'),(5,'2026-04-15','18:00:00','19:00:00',96,8,'zuppa');
/*!40000 ALTER TABLE `prenotazioni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utenti` (
  `id_utente` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `ruolo` enum('admin','docente','ata','studente','altro') NOT NULL,
  `note` text,
  PRIMARY KEY (`id_utente`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'mario.rossi@ittterni.org','Mario','Rossi','admin','Amministratore di Sistema - ITT'),(2,'paolo.neri@ittterni.org','Paolo','Neri','ata','Assistente Tecnico reparto Meccanica'),(4,'cristian.agliani@ittterni.org','Cristian','Agliani','docente','Informatica ed Elaborazione Dati'),(5,'elisa.antonini@ittterni.org','Elisa','Antonini','docente','Matematica e Fisica'),(6,'barbara.ardini@ittterni.org','Barbara','Ardini','docente','Lingua Inglese'),(7,'ramona.arnesi@ittterni.org','Ramona','Arnesi','docente','Scienze Integrate'),(8,'simone.austeri@ittterni.org','Simone','Austeri','docente','Elettronica ed Automazione'),(9,'chiara.austeriottaviani@ittterni.org','Chiara','Austeri Ottaviani','docente','Diritto ed Economia'),(10,'marco.baccarelli@ittterni.org','Marco','Baccarelli','docente','Meccanica, Meccatronica ed Energia'),(11,'benedetta.baiocco@ittterni.org','Benedetta','Baiocco','docente','Chimica e Materiali'),(12,'elisa.baldelli@ittterni.org','Elisa','Baldelli','docente','Lettere e Storia'),(13,'marco.baldoncini@ittterni.org','Marco','Baldoncini','docente','Sistemi e Reti'),(14,'barbara.balloriani@ittterni.org','Barbara','Balloriani','docente','Religione Cattolica'),(15,'marialucia.barberini@ittterni.org','Maria Lucia','Barberini','docente','Costruzioni, Ambiente e Territorio'),(16,'riccardo.barbieri@ittterni.org','Riccardo','Barbieri','docente','Tecnologie Meccaniche'),(17,'mariaelena.bartolini@ittterni.org','Maria Elena','Bartolini','docente','Disegno Tecnico e Progettazione'),(18,'luca.bartolucci@ittterni.org','Luca','Bartolucci','docente','Informatica - Gestione Progetti'),(19,'benedetta.battistelli@ittterni.org','Benedetta','Battistelli','docente','Lingua Inglese'),(20,'emanuele.battistelli@ittterni.org','Emanuele','Battistelli','docente','Scienze Motorie'),(21,'valeria.battistoni@ittterni.org','Valeria','Battistoni','docente','Chimica Analitica'),(22,'francesca.bellezza@ittterni.org','Francesca','Bellezza','docente','Matematica'),(23,'annarita.bellini@ittterni.org','Anna Rita','Bellini','docente','Lettere e Comunicazione'),(24,'antonio.bernardini@ittterni.org','Antonio','Bernardini','docente','Telecomunicazioni'),(25,'giulia.bevilacqua@ittterni.org','Giulia','Bevilacqua','docente','Trasporti e Logistica'),(26,'valentina.bianchi@ittterni.org','Valentina','Bianchi','docente','Sostegno Area Tecnica'),(27,'susanna.biancifiori@ittterni.org','Susanna','Biancifiori','docente','Biologia e Microbiologia'),(28,'isabella.bigaroni@ittterni.org','Isabella','Bigaroni','docente','Fisica Sperimentale'),(29,'luciano.binnella@ittterni.org','Luciano','Binnella','docente','Tecnologie Elettriche ed Elettroniche'),(30,'paola.bobbi@ittterni.org','Paola','Bobbi','docente','Lettere'),(31,'mariacristina.bonifazi@ittterni.org','Maria Cristina','Bonifazi','docente','Chimica Industriale'),(32,'alessandra.brandi@ittterni.org','Alessandra','Brandi','docente','Lingua Inglese'),(33,'elisa.breccia@ittterni.org','Elisa','Breccia','docente','Matematica'),(34,'andrea.brozzetti@ittterni.org','Andrea','Brozzetti','docente','Laboratorio Meccanica'),(35,'valerio.bucci@ittterni.org','Valerio','Bucci','docente','Topografia (CAT)'),(36,'alessandro.camilli@ittterni.org','Alessandro','Camilli','docente','Sistemi e Automazione'),(37,'martina.canali@ittterni.org','Martina','Canali','docente','Scienze della Terra'),(38,'sara.caproni@ittterni.org','Sara','Caproni','docente','Lettere'),(39,'anella.carlea@ittterni.org','Anella','Carlea','docente','Informatica'),(40,'elena.carletti@ittterni.org','Elena','Carletti','docente','Fisica'),(41,'annastella.carollo@ittterni.org','Anna Stella','Carollo','docente','Diritto'),(42,'alessandra.casagrande@ittterni.org','Alessandra','Casagrande','docente','Sostegno'),(43,'emiliano.catozzi@ittterni.org','Emiliano','Catozzi','docente','Tecnologia CAD'),(44,'sara.censi@ittterni.org','Sara','Censi','docente','Matematica'),(45,'laura.cerri@ittterni.org','Laura','Cerri','docente','Informatica'),(46,'claudia.chiappini@ittterni.org','Claudia','Chiappini','docente','Lettere'),(47,'marco.cianchetta@ittterni.org','Marco','Cianchetta','docente','Telecomunicazioni'),(48,'federico.cini@ittterni.org','Federico','Cini','docente','Elettronica'),(49,'giulio.cipolletti@ittterni.org','Giulio','Cipolletti','docente','Elettrotecnica'),(50,'valerio.coacci@ittterni.org','Valerio','Coacci','docente','Meccanica'),(51,'sergio.colasante@ittterni.org','Sergio','Colasante','docente','Chimica'),(52,'alessia.confalone@ittterni.org','Alessia','Confalone','docente','Inglese'),(53,'massimiliano.contessa@ittterni.org','Massimiliano','Contessa','docente','Sistemi Informativi'),(54,'annamaria.crescenzi@ittterni.org','Anna Maria','Crescenzi','docente','Fisica'),(55,'carmelamiriam.dalessandro@ittterni.org','Carmela Miriam','D\'Alessandro','docente','Lettere'),(56,'sara.daminato@ittterni.org','Sara','Daminato','docente','Matematica'),(57,'gianluca.demajo@ittterni.org','Gianluca','De Majo','docente','Logistica e Trasporti'),(58,'franco.desantis@ittterni.org','Franco','De Santis','docente','Meccanica Applicata'),(59,'attilio.delpico@ittterni.org','Attilio','Del Pico','docente','Informatica Industriale'),(60,'maurizio.desantis@ittterni.org','Maurizio','Desantis','docente','Laboratorio Elettronica'),(61,'paola.didonato@ittterni.org','Paola','Di Donato','docente','Scienze'),(62,'roberta.difrancesco@ittterni.org','Roberta','Di Francesco','docente','Storia e Filosofia'),(63,'silvio.digregorio@ittterni.org','Silvio','Di Gregorio','docente','Sistemi e Reti'),(64,'gianfranco.dilorenzo@ittterni.org','Gianfranco','Di Lorenzo','docente','Matematica'),(65,'gabriele.fausti@ittterni.org','Gabriele','Fausti','docente','Progettazione Meccanica'),(66,'mariagrazia.federico@ittterni.org','Maria Grazia','Federico','docente','Diritto'),(67,'patrizia.ferraro@ittterni.org','Patrizia','Ferraro','docente','Lettere'),(68,'emanuela.ferri@ittterni.org','Emanuela','Ferri','docente','Matematica'),(69,'claudia.fiorentini@ittterni.org','Claudia','Fiorentini','docente','Inglese'),(70,'elisa.fontanella@ittterni.org','Elisa','Fontanella','docente','Chimica'),(71,'ambra.franchini@ittterni.org','Ambra','Franchini','docente','Scienze Motorie'),(72,'francescomaria.francioli@ittterni.org','Francesco Maria','Francioli','docente','Elettrotecnica'),(73,'giordano.fratini@ittterni.org','Giordano','Fratini','docente','Laboratorio Informatica'),(74,'sara.frittella@ittterni.org','Sara','Frittella','docente','Scienze'),(75,'laura.ghidini@ittterni.org','Laura','Ghidini','docente','Lettere'),(76,'mario.gigli@ittterni.org','Mario','Gigli','docente','Topografia'),(77,'giulio.giovannelli@ittterni.org','Giulio','Giovannelli','docente','Sistemi Meccanici'),(78,'micaela.gobbi@ittterni.org','Micaela','Gobbi','docente','Inglese'),(79,'leonardo.guarnieri@ittterni.org','Leonardo','Guarnieri','docente','Informatica'),(80,'massimiliano.iommi@ittterni.org','Massimiliano','Iommi','docente','Elettronica'),(81,'mara.laureti@ittterni.org','Mara','Laureti','docente','Matematica'),(82,'susanna.laureti@ittterni.org','Susanna','Laureti','docente','Scienze'),(83,'teresa.lavecchiaditocco@ittterni.org','Teresa','Lavecchia Di Tocco','docente','Sostegno Area Umanistica'),(84,'elvira.lipari@ittterni.org','Elvira','Lipari','docente','Inglese'),(85,'gaetano.loffredo@ittterni.org','Gaetano','Loffredo','docente','Elettrotecnica'),(86,'anna.lucarelli@ittterni.org','Anna','Lucarelli','docente','Lettere'),(87,'giuseppe.luppi@ittterni.org','Giuseppe','Luppi','docente','Informatica'),(88,'carloalberto.macellari@ittterni.org','Carlo Alberto','Macellari','docente','Meccanica'),(89,'francesco.magaletti@ittterni.org','Francesco','Magaletti','docente','Sistemi ed Automazione'),(90,'susanna.mancinelli@ittterni.org','Susanna','Mancinelli Degli Esposti','docente','Chimica'),(91,'stefania.mandolini@ittterni.org','Stefania','Mandolini','docente','Lettere'),(92,'silvia.manfredini@ittterni.org','Silvia','Manfredini','docente','Fisica'),(93,'francesca.marcantonio@ittterni.org','Francesca','Marcantonio','docente','Inglese'),(94,'fabrizio.marcelli@ittterni.org','Fabrizio','Marcelli','docente','Disegno Tecnico'),(95,'chiara.marincolo@ittterni.org','Chiara','Marincolo','docente','Matematica'),(96,'giacomo.bucciarelli@ittterni.org','Giacomo','Bucciarelli','ata','informatica');
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-04 21:12:46
