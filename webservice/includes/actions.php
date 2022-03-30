<?php
/**
 * @return array
 */
function getZelda()
{
    return [
        [
            "id" => 1,
            "name" => "Breath of the Wild",
            "console" => "Nintendo Switch",
            "image" => "../../img/resources/botw.png",
            "quote" => "The reinventor of the open world",
            "tags" => ['Open World', 'Adventure']
        ],
        [
            "id" => 2,
            "name" => "Ocarina of Time",
            "console" => "Nintendo 64",
            "image" => "../../img/resources/oot.png",
            "quote" => "Time travel to save Hyrule from certain doom.",
            "tags" => ['Mask', 'healthy']
        ],
        [
            "id" => 3,
            "name" => "Majoras Mask",
            "console" => "Nintendo 64",
            "image" => "../../img/resources/mm.png",
            "quote" => "Fight a creepy mask that plagues Termina!",
            "tags" => ['psychological horror', 'adventure']
        ],
        [
            "id" => 4,
            "name" => "Links Awakening",
            "console" => "GameBoy",
            "image" => "../../img/resources/la.png",
            "quote" => "Wake up, that's it just wake up it's that easy.",
            "tags" => ['phylosofical', 'adventure']
        ],
        [
            "id" => 5,
            "name" => "A Link to the Past",
            "console" => "Super Nintendo Entertainment System",
            "image" => "../../img/resources/lttp.png",
            "quote" => "Travel to a dark version of Hyrule!",
            "tags" => ['Time travel']
        ]
    ];
}

/**
 * @param $id
 * @return mixed
 */
function getZeldaDetails($id)
{
    $tags = [
        1 => [
            "quote" => "The reinventor of the open world",
            "tags" => ['Open World', 'Adventure']
        ],
        2 => [
            "quote" => "Time travel to save Hyrule from certain doom.",
            "tags" => ['Mask', 'healthy']
        ],
        3 => [
            "quote" => "Fight a creepy mask that plagues Termina!",
            "tags" => ['psychological horror', 'adventure']
        ],
        4 => [
            "quote" => "Wake up, that's it just wake up it's that easy.",
            "tags" => ['phylosofical', 'adventure']
        ],
        5 => [
            "quote" => "Travel to a dark version of Hyrule!",
            "tags" => ['Time travel']
        ],
    ];

    return $tags[$id];
}
