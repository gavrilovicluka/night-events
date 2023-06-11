using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projekat.Migrations
{
    /// <inheritdoc />
    public partial class V4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KomentariDogadjaji");

            migrationBuilder.DropTable(
                name: "KomentariIzvodjaci");

            migrationBuilder.AlterColumn<string>(
                name: "Lokacija",
                table: "Klubovi",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Lokacija",
                table: "Klubovi",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "KomentariDogadjaji",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DogadjajID = table.Column<int>(type: "int", nullable: true),
                    KorisnikID = table.Column<int>(type: "int", nullable: true),
                    Sadrzaj = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KomentariDogadjaji", x => x.ID);
                    table.ForeignKey(
                        name: "FK_KomentariDogadjaji_Dogadjaji_DogadjajID",
                        column: x => x.DogadjajID,
                        principalTable: "Dogadjaji",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_KomentariDogadjaji_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "KomentariIzvodjaci",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    KorisnikID = table.Column<int>(type: "int", nullable: true),
                    MuzickiIzvodjacID = table.Column<int>(type: "int", nullable: true),
                    Sadrzaj = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KomentariIzvodjaci", x => x.ID);
                    table.ForeignKey(
                        name: "FK_KomentariIzvodjaci_Korisnici_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnici",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_KomentariIzvodjaci_MuzickiIzvodjaci_MuzickiIzvodjacID",
                        column: x => x.MuzickiIzvodjacID,
                        principalTable: "MuzickiIzvodjaci",
                        principalColumn: "ID");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariDogadjaji_DogadjajID",
                table: "KomentariDogadjaji",
                column: "DogadjajID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariDogadjaji_KorisnikID",
                table: "KomentariDogadjaji",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariIzvodjaci_KorisnikID",
                table: "KomentariIzvodjaci",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_KomentariIzvodjaci_MuzickiIzvodjacID",
                table: "KomentariIzvodjaci",
                column: "MuzickiIzvodjacID");
        }
    }
}
